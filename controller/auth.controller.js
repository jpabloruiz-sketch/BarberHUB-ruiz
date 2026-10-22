const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const Barberia = require('../models/barberia.model');
const logger = require('../middlewares/logs')

const authCtrl = {};

authCtrl.mostrarLogin = (req, res) => {
    if (req.session.usuario) return res.redirect('/');
    const exito = req.query.registro === 'ok'
        ? 'Cuenta creada correctamente, ya puedes iniciar sesión'
        : null;
    res.render('pages/login', { titulo: 'Iniciar sesión', error: null, exito });
};

authCtrl.mostrarRegistro = (req, res) => {
    if (req.session.usuario) return res.redirect('/');
    res.render('pages/registro', { titulo: 'Crear cuenta', error: null, datos: {} });
};

authCtrl.registro = async (req, res) => {
    const datos = {
        nombre: (req.body.nombre || '').trim(),
        telefono: (req.body.telefono || '').trim(),
        correo: (req.body.correo || '').trim().toLowerCase(),
        contrasena: req.body.contrasena || ''
    };

    const fallo = (mensaje, estado = 400) =>
        res.status(estado).render('pages/registro', { titulo: 'Crear cuenta', error: mensaje, datos });

    try {
        const { nombre, telefono, correo, contrasena } = datos;
        const confirmar = req.body.confirmar || '';

        if (!nombre || !telefono || !correo || !contrasena || !confirmar) {
            return fallo('Completa todos los campos');
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            return fallo('Ingresa un correo válido');
        }

        if (contrasena.length < 6) {
            return fallo('La contraseña debe tener al menos 6 caracteres');
        }

        if (contrasena !== confirmar) {
            return fallo('Las contraseñas no coinciden');
        }

        const existe = await Usuario.findOne({ correo });
        if (existe) return fallo('Ese correo ya está registrado');

        let barberia = await Barberia.findOne();
        if (!barberia) {
            barberia = await Barberia.create({
                nombreBarberia: process.env.BARBERIA_NOMBRE || 'BarberHUB',
                direccion: process.env.BARBERIA_DIRECCION || 'Sin dirección',
                telefono: process.env.BARBERIA_TELEFONO || '0000000000'
            });
        }

        const hash = await bcrypt.hash(contrasena, 10);

        const nuevoUsuario = new Usuario({
            nombre,
            telefono,
            correo,
            contrasena: hash,
            barberia: barberia._id
        });

        await nuevoUsuario.save();
        logger.escribir('usuario creado jajajajaja', 'admin')
        res.redirect('/login?registro=ok');
    } catch (error) {
        if (error && error.code === 11000) {
            return fallo('Ese correo ya está registrado');
        }
        console.error('Error en registro:', error);
        fallo('Error en el servidor, intenta de nuevo', 500);
    }
};

authCtrl.login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).render('pages/login', {
                titulo: 'Iniciar sesión',
                error: 'Ingresa tu correo y tu contraseña'
            });
        }

        const usuario = await Usuario.findOne({ correo: correo.trim().toLowerCase() }).select('+contrasena');

        if (!usuario || !usuario.contrasena) {
            return res.status(401).render('pages/login', {
                titulo: 'Iniciar sesión',
                error: 'Correo o contraseña incorrectos'
            });
        }

        const coincide = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!coincide) {
            return res.status(401).render('pages/login', {
                titulo: 'Iniciar sesión',
                error: 'Correo o contraseña incorrectos'
            });
        }

        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).render('pages/login', {
                    titulo: 'Iniciar sesión',
                    error: 'Error en el servidor, intenta de nuevo'
                });
            }

            req.session.usuario = {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo
            };

            res.redirect('/');
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).render('pages/login', {
            titulo: 'Iniciar sesión',
            error: 'Error en el servidor, intenta de nuevo'
        });
    }
};

authCtrl.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('barberhub.sid');
        res.redirect('/login');
    });
};

module.exports = authCtrl;

//Propósito: Controlar el acceso al sistema mediante sesión (login/logout).
//Datos que maneja: correo y contraseña del usuario, datos básicos en la sesión.
//Flujo: El usuario entra a /login, valida credenciales y queda con sesión activa para acceder al resto de la app.
