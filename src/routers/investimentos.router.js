const express = require('express');
const investimentosController = require('../controllers/investimentos.controller');
require('express-async-errors');

const routerInvestimentos = express.Router();

routerInvestimentos.post('/comprar', investimentosController.buyAssets);

routerInvestimentos.post('/vender', investimentosController.saleAssets)

module.exports = routerInvestimentos;