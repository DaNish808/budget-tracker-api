const express = require('express');
const app = express();
const path = require('path');

const morgan = require('morgan');
const cors = require('cors')();
const errorHandler = require('./error-handler')();
const checkDb = require('./check-connection')();

const categories = require('./routes/categories');

app.use(morgan('dev'));
app.use(cors);
app.use(express.json());
// app.use(express.static('./public'));

app.use(checkDb);
app.use('/api/categories', categories);

// app.use((req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// });

app.use(errorHandler);

module.exports = app;