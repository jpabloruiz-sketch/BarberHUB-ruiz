const Facturacion = require('../models/Facturacion');

const facturacionCtrl = {};

facturacionCtrl.getFacturaciones = async (req, res) => {
    try {
        const facturas = await Facturacion.find();
        res.status(200).json(facturas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener facturaciones', error });
    }
};

facturacionCtrl.getFacturacionById = async (req, res) => {
    try {
        const factura = await Facturacion.findById(req.params.id);
        if (!factura) return res.status(404).json({ mensaje: 'Factura no encontrada' });
        res.status(200).json(factura);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

facturacionCtrl.createFacturacion = async (req, res) => {
    try {
        const nuevaFactura = new Facturacion(req.body);
        await nuevaFactura.save();
        res.status(201).json({ mensaje: 'Facturación registrada', facturacion: nuevaFactura });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar facturación', error });
    }
};

facturacionCtrl.updateFacturacion = async (req, res) => {
    try {
        const facturaActualizada = await Facturacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!facturaActualizada) return res.status(404).json({ mensaje: 'Factura no encontrada' });
        res.status(200).json({ mensaje: 'Facturación actualizada', facturacion: facturaActualizada });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar la facturación', error });
    }
};

facturacionCtrl.deleteFacturacion = async (req, res) => {
    try {
        const facturaEliminada = await Facturacion.findByIdAndDelete(req.params.id);
        if (!facturaEliminada) return res.status(404).json({ mensaje: 'Factura no encontrada' });
        res.status(200).json({ mensaje: 'Facturación eliminada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la facturación', error });
    }
};

module.exports = facturacionCtrl;