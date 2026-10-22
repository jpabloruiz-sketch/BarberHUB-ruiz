const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  correo: { type: String, required: true, unique: true, lowercase: true, trim: true },
  contrasena: { type: String, required: true, select: false },
  barberia: { type: mongoose.Schema.Types.ObjectId, ref: 'Barberia', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);