require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const usuario = require('./src/routes/usuarioRoute');
const sala = require('./src/routes/salaRoute');
const reserva = require('./src/routes/reservaRoute');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/usuario', usuario);
app.use('/sala', sala);
app.use('/reserva', reserva);

app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.PORT} PORT...`);
});

module.exports = app;