const { StatusCodes } = require('http-status-codes');
const ativosService = require('../services/ativos.service');

const getAllAssets = async (_req, res) => {
  const assets = await ativosService.getAllAssets();
  res.status(StatusCodes.OK).json(assets);
}

const getByAsset = async (req, res) => {
  const { id: acaoId } = req.params;
  const asset = await ativosService.getByAsset(acaoId);
  res.status(StatusCodes.OK).json(asset);
}

module.exports = {
  getAllAssets,
  getByAsset,
}