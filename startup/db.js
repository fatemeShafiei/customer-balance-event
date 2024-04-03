const db = require("../models");

module.exports = function () {
    db.sequelize.sync();
}