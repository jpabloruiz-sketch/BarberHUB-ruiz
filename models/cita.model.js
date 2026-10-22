const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  nombreServicio: { type: String, required: true },
  precio: { type: Number, required: true },
  barberia: { type: mongoose.Schema.Types.ObjectId, ref: 'Barberia', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Servicio', servicioSchema);