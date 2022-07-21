const express = require('express');
const ativosController = require('../controllers/ativos.controller');

const ativosRouter = express.Router();

ativosRouter.get('/', ativosController.getAllAssets);

module.exports = ativosRouter;