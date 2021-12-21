const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const {settings} = require('./config');
const template = require('./routes/template');
const provision = require('./routes/provision');
const bodyParser = require('body-parser');

const app = express();

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  app.disable('x-powered-by');
  res.removeHeader('X-Powered-By');
  next();
});

// routes
// template database
app.use('/api/templates', template);
// provision database
app.use('/api/provision', provision);

// home
app.get('/', (req, res) => {
  res.json({ version: settings.version });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({
    status: 'error',
    data: err.message,
    message: 'Something went wrong!!! Please try again later.',
  });
});

app.listen(settings.port, () => {
  console.log(`Server is listening on port ${settings.port}`);
});
