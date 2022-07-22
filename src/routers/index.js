const express = require('express');
const routerInvestimentos = require('./investimentos.router');
const routerConta = require('./conta.router');
const ativosRouter = require('./ativos.router');
const authRouter = require('./auth.router');
const { validationsBodyInvestimento } = require('../middlewares/validationBody.middleware');

const router = express.Router();

router.use('/auth', authRouter);

router.use('/investimentos', validationsBodyInvestimento, routerInvestimentos);

router.use('/conta', routerConta);

router.use('/ativos', ativosRouter);

module.exports = router;