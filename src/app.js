const express = require('express');
const cors = require('cors');
const handleError = require('./middlewares/handleError.middleware');
const handPageNotFound = require('./middlewares/handlePageNotFound');
const router = require('./routers');

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.use(handPageNotFound);

app.use(handleError);

module.exports = app;