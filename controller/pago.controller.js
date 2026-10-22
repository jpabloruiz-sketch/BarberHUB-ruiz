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