const { StatusCodes } = require('http-status-codes');
const ativosService = require('../services/ativos.service');

const getAllAssets = async (_req, res) => {
  const assets = await ativosService.getAllAssets();
  res.status(StatusCodes.OK).json(assets);
}

module.exports = {
  getAllAssets,
}