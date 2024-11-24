const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  timestamp: { type: Date, required: true },
  sourceAppId: { type: String, required: true },
  dataPayload: { type: Object, required: true },
  hash: { type: String, required: true },
  previousHash: { type: String, default: null },
});

module.exports = mongoose.model('Event', eventSchema);
