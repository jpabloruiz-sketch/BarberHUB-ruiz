const Servicio = require('../models/servicio.model');

const servicioCtrl = {};

servicioCtrl.getServicios = async (req, res) => {
    try {
        const servicios = await Servicio.find();
        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener servicios', error });
    }
};

servicioCtrl.getServicioById = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);
        if (!servicio) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
        res.status(200).json(servicio);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

servicioCtrl.createServicio = async (req, res) => {
    try {
        const nuevoServicio = new Servicio(req.body);
        await nuevoServicio.save();
        res.status(201).json({ mensaje: 'Servicio registrado', servicio: nuevoServicio });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar servicio', error });
    }
};

servicioCtrl.updateServicio = async (req, res) => {
    try {
        const servicioActualizado = await Servicio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!servicioActualizado) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
        res.status(200).json({ mensaje: 'Servicio actualizado', servicio: servicioActualizado });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar servicio', error });
    }
};

servicioCtrl.deleteServicio = async (req, res) => {
    try {
        const servicioEliminado = await Servicio.findByIdAndDelete(req.params.id);
        if (!servicioEliminado) return res.status(404).json({ mensaje: 'Servicio no encontrado' });
        res.status(200).json({ mensaje: 'Servicio eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar servicio', error });
    }
};

module.exports = servicioCtrl;

//Propósito: Gestionar el catálogo de lo que ofrece la barbería.
//Datos que maneja: Nombre del servicio (ej. "Corte de cabello"), precio y tiempo de duración en minutos.
//Flujo: El administrador puede crear nuevos servicios, cambiar precios con updateServicio o deshabilitarlos/eliminarlos con deleteServicio.