const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth');

router.get('/', requireAuth, (req, res) => {
    res.render('pages/inicio', { titulo: 'Inicio' });
});

module.exports = router;
