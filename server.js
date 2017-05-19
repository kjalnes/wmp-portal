const db = require('./models');
const port = process.env.PORT || 3000;

require('http').createServer(require('./app')).listen(port, ()=> console.log(`Port ${port} is a beautiful port`));

db.seed();
