const crypto = require('crypto');

function generateHash(log) {
  return crypto.createHash('sha256').update(JSON.stringify(log)).digest('hex');
}

module.exports = { generateHash };
