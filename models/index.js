const conn = require('./db');


const User = conn.define('user', {
  firstName: conn.Sequelize.STRING,
  lastName: conn.Sequelize.STRING,
  email: {
    type: conn.Sequelize.STRING,
    // unique: true
  },
  password: conn.Sequelize.STRING
});


const Class = conn.define('class', {
  schoolName: conn.Sequelize.STRING,
  size: conn.Sequelize.INTEGER,
  semester: conn.Sequelize.STRING,
  coordinates: conn.Sequelize.ARRAY(conn.Sequelize.INTEGER)
});


Class.belongsTo(User);


const sync = ()=> conn.sync({ force: true });

const seed = ()=> {
  const users = [{firstName:'Rolf Ivar', lastName: 'Breivik', email:'name@email.com'}, {firstName:'Vegard', lastName:'Hillestad', email:'name2@email.com'}, {firstName:'Åse', lastName: 'Urke', email:'name3@email.com'}];
  const classes = [{schoolName: 'Fullstack', size: 30, semester:'fall-17', coordinates: [40.7050758, -74.00916039999998]}, {schoolName: 'Spjelkavik Ungdomskole', size: 29, semester:'fall-17', coordinates: [62.46176910000001, 6.368587599999955]}, {schoolName: 'Brighton Junior School Bweyogerere', size: 30, semester:'fall-17', coordinates: [0.3353678, 32.66730180000002]}];

  let rolf, vegard, aase, Fullstack, Spjelkavik, Bweyogerere;

  return sync()
    // .then(()=> {
    //   return User.destroy({ truncate: true });
    // })
    .then(()=> {
      const userPromises = users.map( user => User.create( { firstName: user.firstName, lastName: user.lastName, email: user.email, password: '123'}));
      const classPromises = classes.map( _class => Class.create({ schoolName: _class.schoolName, size: _class.size, semester: _class.semester, coordinates: _class.coordinates }))
      return Promise.all(userPromises.concat(classPromises));
    })
    .then( result => [ rolf, vegard, aase, Fullstack, Spjelkavik, Bweyogerere] = result )
    .then(()=> { rolf, vegard, aase, Fullstack, Spjelkavik, Bweyogerere });
};

module.exports = {
  models: {
    User,
    Class
  },
  sync,
  seed
};
