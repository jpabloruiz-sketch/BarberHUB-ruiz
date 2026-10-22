const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  mensual: { type: Number, required: true },
  anual: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);