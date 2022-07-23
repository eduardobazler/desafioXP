const express = require('express');
const routerInvestimentos = require('./investimentos.router');
const routerConta = require('./conta.router');
const ativosRouter = require('./ativos.router');
const authRouter = require('./auth.router');
const userRouter = require('./user.roter');
const authMiddleware = require('../middlewares/auth.middleware');
const { validationsBodyInvestimento, validaeBodyAuth } = require('../middlewares/validationBody.middleware');

const router = express.Router();

router.use('/auth', validaeBodyAuth, authRouter);

router.use('/investimentos', authMiddleware, validationsBodyInvestimento, routerInvestimentos);

router.use('/conta', authMiddleware, routerConta);

router.use('/ativos', authMiddleware, ativosRouter);

router.use('/user', userRouter);

module.exports = router;