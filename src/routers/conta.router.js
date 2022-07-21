const express = require('express');
const contaController = require('../controllers/conta.controller');
const { validationsBodyDeposito } = require('../middlewares/validationBody.middleware');
require('express-async-errors');

const contaRouter = express.Router();

contaRouter.post('/deposito', validationsBodyDeposito, contaController.accountDeposit);

contaRouter.post('/saque', validationsBodyDeposito, contaController.accountWithdrawal);

contaRouter.get('/ativos/:id', contaController.getAssets)

contaRouter.get('/:id', contaController.getBankBalance);

module.exports = contaRouter;