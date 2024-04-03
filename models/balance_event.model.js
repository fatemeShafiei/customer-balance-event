const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
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
        time: {
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
            type: DataTypes.BIGINT(11),
            allowNull: false
        },

    },{
        updatedAt: false,
        createdAt: false
    });
};
