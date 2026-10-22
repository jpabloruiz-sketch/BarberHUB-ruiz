const express = require('express');
const router = express.Router();
const authCtrl = require('../controller/auth.controller');

router.get('/login', authCtrl.mostrarLogin);
router.post('/login', authCtrl.login);
router.get('/registro', authCtrl.mostrarRegistro);
router.post('/registro', authCtrl.registro);
router.post('/logout', authCtrl.logout);

module.exports = router;
