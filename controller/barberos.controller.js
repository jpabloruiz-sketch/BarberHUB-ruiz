const Barbero = require('../models/Barbero');

const barberoCtrl = {};

barberoCtrl.getBarberos = async (req, res) => {
    try {
        const barberos = await Barbero.find().populate('barberia', 'nombreBarberia');
        res.status(200).json(barberos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los barberos', error });
    }
};

barberoCtrl.getBarberoById = async (req, res) => {
    try {
        const barbero = await Barbero.findById(req.params.id).populate('barberia');
        if (!barbero) return res.status(404).json({ mensaje: 'Barbero no encontrado' });
        res.status(200).json(barbero);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

barberoCtrl.createBarbero = async (req, res) => {
    try {
        const nuevoBarbero = new Barbero(req.body);
        await nuevoBarbero.save();
        res.status(201).json({ mensaje: 'Barbero creado con éxito', barbero: nuevoBarbero });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el barbero', error });
    }
};

barberoCtrl.updateBarbero = async (req, res) => {
    try {
        const barberoActualizado = await Barbero.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!barberoActualizado) return res.status(404).json({ mensaje: 'Barbero no encontrado' });
        res.status(200).json({ mensaje: 'Barbero actualizado', barbero: barberoActualizado });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el barbero', error });
    }
};

barberoCtrl.deleteBarbero = async (req, res) => {
    try {
        const barberoEliminado = await Barbero.findByIdAndDelete(req.params.id);
        if (!barberoEliminado) return res.status(404).json({ mensaje: 'Barbero no encontrado' });
        res.status(200).json({ mensaje: 'Barbero eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el barbero', error });
    }
};

module.exports = barberoCtrl;