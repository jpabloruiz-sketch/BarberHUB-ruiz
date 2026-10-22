const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  cantidad: { type: Number, required: true },
  fecha: { type: Date, required: true },
  origenPago: { type: String, required: true },
  barberia: { type: mongoose.Schema.Types.ObjectId, ref: 'Barberia', required: true },
  modoPago: { type: mongoose.Schema.Types.ObjectId, ref: 'ModoPago', required: true },
  facturacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Facturacion', required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Pago', pagoSchema);