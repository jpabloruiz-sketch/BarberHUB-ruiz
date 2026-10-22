const ModoPago = require('../models/modopago.model');

const modoPagoCtrl = {};

modoPagoCtrl.getModosPago = async (req, res) => {
    try {
        const modosPago = await ModoPago.find();
        res.status(200).json(modosPago);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener modos de pago', error });
    }
};

modoPagoCtrl.getModoPagoById = async (req, res) => {
    try {
        const modoPago = await ModoPago.findById(req.params.id);
        if (!modoPago) return res.status(404).json({ mensaje: 'Modo de pago no encontrado' });
        res.status(200).json(modoPago);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

modoPagoCtrl.createModoPago = async (req, res) => {
    try {
        const nuevoModoPago = new ModoPago(req.body);
        await nuevoModoPago.save();
        res.status(201).json({ mensaje: 'Modo de pago registrado', modoPago: nuevoModoPago });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar modo de pago', error });
    }
};

modoPagoCtrl.updateModoPago = async (req, res) => {
    try {
        const modoPagoActualizado = await ModoPago.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!modoPagoActualizado) return res.status(404).json({ mensaje: 'Modo de pago no encontrado' });
        res.status(200).json({ mensaje: 'Modo de pago actualizado', modoPago: modoPagoActualizado });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar modo de pago', error });
    }
};

modoPagoCtrl.deleteModoPago = async (req, res) => {
    try {
        const modoPagoEliminado = await ModoPago.findByIdAndDelete(req.params.id);
        if (!modoPagoEliminado) return res.status(404).json({ mensaje: 'Modo de pago no encontrado' });
        res.status(200).json({ mensaje: 'Modo de pago eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar modo de pago', error });
    }
};

module.exports = modoPagoCtrl;

//Propósito: Administrar los medios de pago permitidos en el negocio.
//Datos que maneja: Nombre (Efectivo, Nequi, Transferencia, Tarjeta) y una descripción opcional.
//Flujo: Sirve para alimentar las opciones que el cliente podrá elegir al momento de pagar una cita o plan.

pago.controller.js
const Pago = require('../models/pago.model');

const pagoCtrl = {};

pagoCtrl.getPagos = async (req, res) => {
    try {
        const pagos = await Pago.find().populate('modoPago').populate('usuario');
        res.status(200).json(pagos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener pagos', error });
    }
};

pagoCtrl.getPagoById = async (req, res) => {
    try {
        const pago = await Pago.findById(req.params.id).populate('modoPago').populate('usuario');
        if (!pago) return res.status(404).json({ mensaje: 'Pago no encontrado' });
        res.status(200).json(pago);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

pagoCtrl.createPago = async (req, res) => {
    try {
        const nuevoPago = new Pago(req.body);
        await nuevoPago.save();
        res.status(201).json({ mensaje: 'Pago registrado', pago: nuevoPago });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar pago', error });
    }
};

pagoCtrl.updatePago = async (req, res) => {
    try {
        const pagoActualizado = await Pago.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pagoActualizado) return res.status(404).json({ mensaje: 'Pago no encontrado' });
        res.status(200).json({ mensaje: 'Pago actualizado', pago: pagoActualizado });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar pago', error });
    }
};

pagoCtrl.deletePago = async (req, res) => {
    try {
        const pagoEliminado = await Pago.findByIdAndDelete(req.params.id);
        if (!pagoEliminado) return res.status(404).json({ mensaje: 'Pago no encontrado' });
        res.status(200).json({ mensaje: 'Pago eliminado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar pago', error });
    }
};

module.exports = pagoCtrl;

//Propósito: Registrar cada transacción financiera o cobro realizado.
//Diferencia clave: Este controlador utiliza la función .populate().