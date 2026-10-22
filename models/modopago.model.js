const mongoose = require('mongoose');

const modoPagoSchema = new mongoose.Schema({
  nombrePago: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ModoPago', modoPagoSchema);