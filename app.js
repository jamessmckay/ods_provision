const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const {settings} = require('./config');
const bodyParser = require('body-parser');

// routes
const templatesRoute = require('./routes/template');
const provisionRoute = require('./routes/provision');
const vendorRoute = require('./routes/vendor');
const namespaceRoute = require('./routes/namespaces');
const profileRoute = require('./routes/profile');
const keyRoute = require('./routes/keymgmt');

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

// apis
// templates
app.use('/api/templates', templatesRoute);

// provision database
app.use('/api/provision', provisionRoute);

// vendor management
app.use('/api/vendors', vendorRoute);
app.use('/api/vendors/keys', keyRoute);

// profiles management
app.use('/api/profiles', profileRoute);

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
