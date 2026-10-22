const mongoose = require('mongoose');

const barberoSchema = new mongoose.Schema({
  telefono: { type: String, required: true },
  correo: { type: String, required: true },
  barberia: { type: mongoose.Schema.Types.ObjectId, ref: 'Barberia', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Barbero', barberoSchema);