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

const createAsset = async (req, res) => {
  const { company, tag, value, quantity } = req.body;
  const assetCreated = await ativosService.createAsset({ company, tag, value, quantity });
  res.status(StatusCodes.OK).json(assetCreated);
}

module.exports = {
  getAllAssets,
  getByAsset,
  createAsset
}