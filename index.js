require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const authRouter = require('./router/auth.router');
const inicioRouter = require('./router/inicio.router');
const { cargarUsuario } = require('./middlewares/auth');

const app = express();

// Importante: Usar el puerto asignado por Render
const PORT = process.env.PORT || 8000;

// Conexión a MongoDB
const MONGO_URI = process.env.MONGODB_URI;
const cron = require('node-cron');
const backup = require('./backup')



cron.schedule('0 2 * * *', async () => {
   console.log('Realizando Backup de la Base de datos');
   backup.backupDatabase();
});




if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));
} else {
  console.log('No se proporcionó MONGODB_URI en las variables de entorno');
}

// Vistas (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares de entrada
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Archivos estáticos (CSS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Sesión con cookie httpOnly
const SESSION_SECRET = process.env.SESSION_SECRET || process.env.JWT_SECRET || 'barberhub-dev-secret';

app.use(session({
  name: 'barberhub.sid',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 8 // 8 horas
  }
}));

// Usuario en sesión disponible para las vistas
app.use(cargarUsuario);

// Rutas
app.use('/', authRouter);
app.use('/', inicioRouter);

// Manejo de rutas inexistentes
app.use((req, res) => {
  if (req.session && req.session.usuario) {
    return res.status(404).send('Página no encontrada');
  }
  res.redirect('/login');
});

// ESCUCHAR EN EL PUERTO (Vital para que Node no se cierre)
app.listen(PORT, () => {
  console.log(`Servidor BarberHUB corriendo en el puerto ${PORT}`);
});
