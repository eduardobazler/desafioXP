const express = require('express');
const ativosController = require('../controllers/ativos.controller');
const validateRoleMiddleware = require('../middlewares/validateRole.middleware');
const { validationsBodyAsset } = require('../middlewares/validationBody.middleware')
require('express-async-errors')

const ativosRouter = express.Router();

ativosRouter.get('/', ativosController.getAllAssets);

ativosRouter.get('/:id', ativosController.getByAsset);

ativosRouter.post('/', validateRoleMiddleware, validationsBodyAsset, ativosController.createAsset);

module.exports = ativosRouter;