
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const errorHandler = require('./utils/ApiError');
//const sequelize = require('./config/database');


//const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const carsRouter = require('./routes/cars');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({
  origin: 'http://localhost:3000' // Replace with your React app's origin
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler);


//Database connection
// sequelize.authenticate().then(() => {
//   console.log('Database connection has been established successfully.');
// }).catch(err => {
//   console.error('Unable to connect to the database:', err);
// });




//Routes
//app.use('/api/Bankverbindungen', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/cars', carsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const errcode = new Error("Not Found.");
  errcode.statusCode = 404;
  console.log("TCL: err", 404)
  return next(errcode);
});

app.use(function (err, req, res, next) {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    code: statusCode,
    message: err.message || 'Internal Server Error',
    timestamp: new Date()
  });
});

module.exports = app;
