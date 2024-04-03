const express = require("express");
const winston = require('winston');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;