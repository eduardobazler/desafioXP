const express = require('express');
const contaController = require('../controllers/conta.controller');
require('express-async-errors');

const contaRouter = express.Router();

contaRouter.post('/deposito', contaController.accountDeposit)

module.exports = contaRouter;