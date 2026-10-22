const mongoose = require('mongoose');

const facturacionSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  descripcion: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Facturacion', facturacionSchema);