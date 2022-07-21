const express = require('express');
const contaController = require('../controllers/conta.controller');
require('express-async-errors');

const contaRouter = express.Router();

contaRouter.post('/deposito', contaController.accountDeposit);

contaRouter.post('/saque', contaController.accountWithdrawal);

contaRouter.get('/ativos/:id', contaController.getAssets)

contaRouter.get('/:id', contaController.getBankBalance);

module.exports = contaRouter;