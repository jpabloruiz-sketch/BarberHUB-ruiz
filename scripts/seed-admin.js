require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const Barberia = require('../models/barberia.model');

const correo = process.env.ADMIN_CORREO || 'admin@barberhub.com';
const contrasena = process.env.ADMIN_PASSWORD;

if (!contrasena) {
  console.error('Falta ADMIN_PASSWORD en el archivo .env');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error('Falta MONGODB_URI en el archivo .env');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB Atlas');

    let barberia = await Barberia.findOne();
    if (!barberia) {
      barberia = await Barberia.create({
        nombreBarberia: process.env.BARBERIA_NOMBRE || 'BarberHUB',
        direccion: process.env.BARBERIA_DIRECCION || 'Sin dirección',
        telefono: process.env.BARBERIA_TELEFONO || '0000000000'
      });
      console.log(`Barbería creada: ${barberia.nombreBarberia}`);
    }

    const hash = await bcrypt.hash(contrasena, 10);

    const usuario = await Usuario.findOneAndUpdate(
      { correo: correo.toLowerCase() },
      {
        $set: {
          nombre: process.env.ADMIN_NOMBRE || 'Administrador',
          telefono: process.env.ADMIN_TELEFONO || '0000000000',
          correo: correo.toLowerCase(),
          contrasena: hash,
          barberia: barberia._id
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`Administrador listo: ${usuario.correo}`);
    process.exit(0);
  } catch (error) {
    console.error('Error al crear el administrador:', error);
    process.exit(1);
  }
})();
