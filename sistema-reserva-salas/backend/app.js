const express = require('express');
const bodyParser = require('body-parser');

const sala = require('../backend/src/routes/salaRoute');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/sala', sala);

app.listen(8000, () => {
    console.log("Server running...");
});

module.exports = app;