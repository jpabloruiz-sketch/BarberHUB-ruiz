const Cita = require('../models/Cita');

const citaCtrl = {};

citaCtrl.getCitas = async (req, res) => {
    try {
        const citas = await Cita.find()
            .populate('barberia', 'nombreBarberia')
            .populate('barbero', 'correo telefono');
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las citas', error });
    }
};

citaCtrl.getCitaById = async (req, res) => {
    try {
        const cita = await Cita.findById(req.params.id)
            .populate('barberia')
            .populate('barbero');
        if (!cita) return res.status(404).json({ mensaje: 'Cita no encontrada' });
        res.status(200).json(cita);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

citaCtrl.createCita = async (req, res) => {
    try {
        const nuevaCita = new Cita(req.body);
        await nuevaCita.save();
        res.status(201).json({ mensaje: 'Cita registrada con éxito', cita: nuevaCita });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al agendar la cita', error });
    }
};

citaCtrl.updateCita = async (req, res) => {
    try {
        const citaActualizada = await Cita.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!citaActualizada) return res.status(404).json({ mensaje: 'Cita no encontrada' });
        res.status(200).json({ mensaje: 'Cita actualizada', cita: citaActualizada });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar la cita', error });
    }
};

citaCtrl.deleteCita = async (req, res) => {
    try {
        const citaEliminada = await Cita.findByIdAndDelete(req.params.id);
        if (!citaEliminada) return res.status(404).json({ mensaje: 'Cita no encontrada' });
        res.status(200).json({ mensaje: 'Cita cancelada/eliminada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la cita', error });
    }
};

module.exports = citaCtrl;