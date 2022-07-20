const express = require('express');
const routerInvestimentos = require('./investimentos.router');
const router = express.Router();

router.use('/investimentos', routerInvestimentos);

module.exports = router;