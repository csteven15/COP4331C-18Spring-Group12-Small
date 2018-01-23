const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to database
mongoose.connect(config.database);

// on connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// error connection
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

// port number
const port = 3000;

// cors
app.use(cors());

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// index
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// start server
app.listen(port, () =>{
  console.log('Server started on port ' + port);
});
