const express = require('express');
const morgan = require('morgan');
const { application_name } = require('pg/lib/defaults');
const {settings} = require('./config');
const db_templates = require('./routes/template_db');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/templates', db_templates);

app.get('/', (req, res) => {
    res.json({
        version: '0.1.0'
    });
})




app.listen(settings.port, () => {
    console.log(`Server is listening on port ${settings.port}`);
});