const express = require('express');
const balanceEvents = require('../routes/balanceEvents');


module.exports = function(app) {
  app.use(express.json());
  app.use('/api/events', balanceEvents);
}