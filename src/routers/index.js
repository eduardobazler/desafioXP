const express = require('express');
const routerInvestimentos = require('./investimentos.router');
const routerConta = require('./conta.router');
const ativosRouter = require('./ativos.router');

const router = express.Router();

router.use('/investimentos', routerInvestimentos);

router.use('/conta', routerConta);

router.use('/ativos', ativosRouter);

module.exports = router;