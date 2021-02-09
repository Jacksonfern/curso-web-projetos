const { addReserva, getReservasByUser,
        getReservasBySala, deleteReserva } = require('../controllers/reservaController');
const routes = require('express').Router();

routes.post('/:id_usuario', addReserva);
routes.get('/usuario/:id_usuario', getReservasByUser);
routes.get('/sala/:id_sala', getReservasBySala);
routes.delete('/:id', deleteReserva);

module.exports = routes;