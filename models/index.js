const config = require('config');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.get('dbName'), config.get('user'), config.get('password'), {
  host: config.get('host'),
  dialect: config.get('dialect'),
});

const db = {};
db.sequelize = sequelize;
db.balanceEvents = require("./balance_event.model.js")(sequelize);


module.exports = db;
