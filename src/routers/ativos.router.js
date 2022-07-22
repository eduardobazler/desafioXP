const express = require('express');
const ativosController = require('../controllers/ativos.controller');
require('express-async-errors')

const ativosRouter = express.Router();

ativosRouter.get('/', ativosController.getAllAssets);

ativosRouter.get('/:id', ativosController.getByAsset);

module.exports = ativosRouter;