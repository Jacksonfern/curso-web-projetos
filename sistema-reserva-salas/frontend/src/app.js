require('dotenv/config');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/html'));

app.listen(9000, () => {
    console.log("Front-end server is running...");
});