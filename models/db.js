const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  },
  password: conn.Sequelize.STRING
});



const sync = ()=> conn.sync({ force: true });

const seed = ()=> {
  const users = ['Rolf Ivar Breivik', 'Vegard Hillestad', 'Åse Urke'];
  let rolf, vegard, aase;

  return sync()
    .then(()=> {
      return User.destroy({ truncate: true });//not sure why i need this?/
    })
    .then(()=> {
      const promises = users.map( name => User.create( { name, password: '123'}));
      return Promise.all(promises);
    })
    .then( result => [ rolf, vegard, aase] = result )
    .then(()=> { rolf, vegard, aase });
};

module.exports = {
  models: {
    User
  },
  sync,
  seed
};
