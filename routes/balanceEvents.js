const express = require('express');
const router = express.Router();
const db = require("../models");
const {validateBalanceEvent} = require('../models/balance_event.model');
const moment = require("moment");
const {error} = require("winston");

const BalanceEvents = db.balanceEvents;
const Op = require('sequelize').Op;


router.post('/:market/:customerId', async (req, res) => {
    const {error} = validateBalanceEvent(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const randomId = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
    const balanceEvent = {
        id: randomId,
        market: req.params.market,
        customerId: req.params.customerId,
        reason: req.body.reason,
        reasonTime: moment(req.body.reasonTime).format("YYYY-MM-DD HH:mm:ss"),
        businessUnit: req.body.businessUnit,
        type: req.body.type,
        value: req.body.type=== "DECREASED" ? -req.body.value : req.body.value,
    };

    BalanceEvents.create(balanceEvent)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the balance event."
            });
        });
});

router.get('/:market/:customerId/:reason/:reasonTime', async (req, res) => {
    const year = Number(req.params.reasonTime) - 1;
    const yearTimeStamp = calculateTimeStamp(year);
    const nextYearTimeStamp = calculateTimeStamp(year + 1);
    const condition = {
        market: req.params.market,
        customerId: req.params.customerId,
        reason: req.params.reason
    };
    const conditionBeforeReasonYear = getConditionWithNewProperty(condition, "reasonTime", {
        [Op.lt]: yearTimeStamp
    })
    const conditionDuringReasonYear = getConditionWithNewProperty(condition, "reasonTime", {
        [Op.between]: [yearTimeStamp, nextYearTimeStamp]
    })
    const openingBalancePromise = sumValueOfBalances(conditionBeforeReasonYear)
    const closingBalancePromise = sumValueOfBalances(conditionDuringReasonYear)
    Promise.all([openingBalancePromise, closingBalancePromise])
        .then(results => {
            const openingBalance = results[0] ? results[0] : 0;
            const closingBalance = results[0] + results[1];
            res.send({
                openingBalance,
                closingBalance
            })
        });

});


function calculateTimeStamp(year) {
    return moment(year, 'Y').format('YYYY-MM-DD HH:mm:ss');
}

function getConditionWithNewProperty(condition, property, propertyValue) {
    const conditionWithNewProperty = {...condition};
    conditionWithNewProperty[property] = propertyValue;
    return conditionWithNewProperty
}

async function sumValueOfBalances(condition) {
    const balance = await BalanceEvents.sum(
        'value',
        {
            where: condition

        }
    )
    return balance
}

module.exports = router;