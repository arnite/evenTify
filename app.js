const express = require('express');
const app = express();
const morgan = require('morgan');
const integrateDB = require('./config/db');
const compression = require('compression');
const userRoute = require('./routes/userRoute.js');
const eventRoute = require('./routes/eventRoute.js');
const bookingRoute = require('./routes/bookingRoute.js');
const AppError = require('./utils/appError');
const globalerrorhandler = require('./controllers/errorController.js');
const superAdmin = require('./config/superAdmin');

//Integrate database
integrateDB();

//Create superAdmin
superAdmin();

//Global middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Body parser, reading data from body into req.body.
app.use(express.json());

//Serving static files.
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Test Route
app.get('/', (req, res) => {
  res.send('API running..');
});

//Main Routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/events', eventRoute);
app.use('/api/v1/bookings', bookingRoute);

//Unresolved Route
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//Error handler.
app.use(globalerrorhandler);

module.exports = app;
