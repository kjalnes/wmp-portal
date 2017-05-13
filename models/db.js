const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

const User = conn.define('user', {
  firstName: conn.Sequelize.STRING,
  lastName: conn.Sequelize.STRING,
  email: {
    type: conn.Sequelize.STRING,
    unique: true
  },
  password: conn.Sequelize.STRING
});



const sync = ()=> conn.sync({ force: true });

const seed = ()=> {
  const users = [{firstName:'Rolf Ivar', lastName: 'Breivik', email:'name@email.com'}, {firstName:'Vegard', lastName:'Hillestad', email:'name2@email.com'}, {firstName:'Åse', lastName: 'Urke', email:'name3@email.com'}];
  let rolf, vegard, aase;

  return sync()
    .then(()=> {
      return User.destroy({ truncate: true });//not sure why i need this?/
    })
    .then(()=> {
      const promises = users.map( user => User.create( { firstName: user.firstName, lastName: user.lastName, email: user.email, password: '123'}));
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
