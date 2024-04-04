const { DataTypes } = require('sequelize');
const Joi = require('joi');

function getModel(sequelize) {
    return sequelize.define("balance_event", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        market: {
            type: DataTypes.STRING,
            allowNull: false
        },
        customerId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reasonTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        businessUnit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

    },{
        updatedAt: false,
        createdAt: 'time'
    });
}
function validateBalanceEvent(balanceEvent) {
    const schema = Joi.object({
        reason: Joi.string().min(5).max(50).required(),
        reasonTime: Joi.date().required(),
        businessUnit: Joi.string().min(1).max(50).required(),
        type: Joi.string().min(5).max(50).required(),
        value: Joi.number().min(0).required(),
    });

    return schema.validate(balanceEvent);
}
exports.getModel = getModel;
exports.validateBalanceEvent = validateBalanceEvent;

