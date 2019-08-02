const mongoose = require('mongoose');
const http = require('http');

let envPath = '';
if (process.env.NODE_ENV === 'test') {
  envPath = `.${process.env.NODE_ENV}`;
}
require('dotenv').config({path: `.env${envPath}`});

// Database
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`🚫 ${err.message}`);
});

// Models Import
require('./models/Banner');

const app = require('./app');
const port = process.env.PORT || 1338;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on ${port}...`);
});

module.exports = server;