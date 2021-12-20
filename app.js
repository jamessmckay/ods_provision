const express = require('express');
const morgan = require('morgan');
const {settings} = require('./config');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/templates', template);

app.get('/', (req, res) => {
  res.json({version: '0.1.0'});
});

app.listen(settings.port, () => {
  console.log(`Server is listening on port ${settings.port}`);
});
