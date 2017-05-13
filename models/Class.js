const conn = require('./db');

const Class = conn.define('class', {
  size: conn.Sequelize.INTEGER,

});
