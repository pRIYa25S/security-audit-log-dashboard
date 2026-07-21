const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  action: { type: String, required: true },
  actor: { type: String, required: true },
  role: { type: String, required: true },
  resource: { type: String, required: true },
  ipAddress: { type: String, required: true },
  region: { type: String, required: true },
  severity: { type: String, required: true },
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);