const { addUsuario, loginUsuario,
        updateUsuario, deleteUsuario } = require('../controllers/usuarioController');
const routes = require('express').Router();

routes.post('/', addUsuario);
routes.get('/login', loginUsuario);
routes.put('/:id', updateUsuario);
routes.delete('/:id', deleteUsuario);

module.exports = routes;