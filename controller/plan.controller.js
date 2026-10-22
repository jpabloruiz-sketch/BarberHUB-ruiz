const Plan = require('../models/plan.model');

const planCtrl = {};

planCtrl.getPlanes = async (req, res) => {
    try {
        const planes = await Plan.find();
        res.status(200).json(planes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener planes', error });
    }
};

planCtrl.getPlanById = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);
        if (!plan) return res.status(404).json({ mensaje: 'Plan no encontrado' });
        res.status(200).json(plan);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

planCtrl.createPlan = async (req, res) => {
    try {
        const nuevoPlan = new Plan(req.body);
        await nuevoPlan.save();
        res.status(201).json({ mensaje: 'Plan registrado', plan: nuevoPlan });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar plan', error });
    }
};

planCtrl.updatePlan = async (req, res) => {
    try {
        const planActualizado = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!planActualizado) return res.status(404).json({ mensaje: 'Plan no encontrado' });
        res.status(200).json({ mensaje: 'Plan actualizado', plan: planActualizado });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar plan', error });
    }
};

planCtrl.deletePlan = async (req, res) => {
    try {
        const planEliminado = await Plan.findByIdAndDelete(req.params.id);
        if (!planEliminado) return res.status(404).json({ mensaje: 'Plan no encontrado' });
        res.status(200).json({ mensaje: 'Plan eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar plan', error });
    }
};

module.exports = planCtrl;

//Propósito: Gestionar las suscripciones o paquetes especiales de barbería.
//Datos que maneja: Nombre del plan, precio mensual/anual y descripción de lo que incluye.
//Flujo: Permite crear y ajustar los paquetes comerciales que ofrece BarberHUB.


servicio.controller.js
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