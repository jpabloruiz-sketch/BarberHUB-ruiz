const Usuario = require('../models/usuario.model');
const logger = require('../middlewares/logs')

const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
    }
};

usuarioCtrl.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

usuarioCtrl.createUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        logger.escribir('usuario creado jajajajaja', 'admin')
        res.status(201).json({ mensaje: 'Usuario registrado', usuario: nuevoUsuario });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar usuario', error });
    }
};

usuarioCtrl.updateUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuarioActualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.status(200).json({ mensaje: 'Usuario actualizado', usuario: usuarioActualizado });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar usuario', error });
    }
};

usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.status(200).json({ mensaje: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar usuario', error });
    }
};

module.exports = usuarioCtrl;

//Propósito: Administrar la información de los clientes o administradores del sistema.
//Datos que maneja: Nombre, correo electrónico, teléfono y rol.
//Flujo: Permite registrar nuevos clientes cuando entran a la app, listar la agenda de usuarios o actualizar su número telefónico.