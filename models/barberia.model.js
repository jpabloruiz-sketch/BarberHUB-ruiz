const mongoose = require('mongoose');

const barberiaSchema = new mongoose.Schema({
  nombreBarberia: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Barberia', barberiaSchema);