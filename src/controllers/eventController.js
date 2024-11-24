const Event = require('../models/eventModel');
const { generateHash } = require('../utils/hashUtils');
const Joi = require('joi');

// Joi Validation Schema
const eventSchema = Joi.object({
  eventType: Joi.string().required(),
  timestamp: Joi.date().iso().required(),
  sourceAppId: Joi.string().required(),
  dataPayload: Joi.object().required(),
});

// Create New Event Log
exports.createEvent = async (req, res) => {
  try {
    // Validate Request Body
    const { error } = eventSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Get Last Log
    const lastLog = await Event.findOne().sort({ timestamp: -1 });

    // Prepare Event Data
    const eventData = { ...req.body, previousHash: lastLog?.hash || null };
    eventData.hash = generateHash(eventData);

    // Save Event to Database
    const event = new Event(eventData);
    await event.save();

    res.status(201).json({ message: 'Event logged successfully', event });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Query Events
exports.queryEvents = async (req, res) => {
  try {
    const { eventType, sourceAppId, startDate, endDate, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (eventType) filters.eventType = eventType;
    if (sourceAppId) filters.sourceAppId = sourceAppId;
    if (startDate || endDate) filters.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };

    const events = await Event.find(filters)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ events });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Validate Event Chain
exports.validateChain = async (req, res) => {
  try {
    const events = await Event.find().sort({ timestamp: 1 });

    let valid = true;
    for (let i = 1; i < events.length; i++) {
      const recalculatedHash = generateHash({
        ...events[i]._doc,
        hash: undefined,
        _id: undefined,
        __v: undefined,
      });

      if (
        events[i].previousHash !== events[i - 1].hash ||
        events[i].hash !== recalculatedHash
      ) {
        valid = false;
        break;
      }
    }

    res.json({ valid });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
