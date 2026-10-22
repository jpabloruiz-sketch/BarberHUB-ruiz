const requireAuth = (req, res, next) => {
    if (req.session && req.session.usuario) {
        res.locals.usuario = req.session.usuario;
        return next();
    }
    res.redirect('/login');
};

const cargarUsuario = (req, res, next) => {
    if (req.session && req.session.usuario) {
        res.locals.usuario = req.session.usuario;
    }
    next();
};

module.exports = { requireAuth, cargarUsuario };
