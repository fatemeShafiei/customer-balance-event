const express = require('express');
const router = express.Router();
const db = require("../models");
const BalanceEvents = db.balanceEvents;
const Op = require('sequelize').Op;


router.post('/:market/:customerId', async (req, res) => {
  const randomId = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
  const balanceEvent = {
    id: randomId,
    market: req.params.market,
    customerId: req.params.customerId,
    reason: req.body.reason,
    reasonTime: req.body.reasonTime,
    businessUnit: req.body.businessUnit,
    type: req.body.type,
    value: req.body.value,
  };

  BalanceEvents.create(balanceEvent)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while creating the Tutorial."
        });
      });
});


module.exports = router; 