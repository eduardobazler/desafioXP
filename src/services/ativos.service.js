const { StatusCodes } = require('http-status-codes');
const { Corretora, Acao } = require('../models');
const throwErroWithStatus = require('../utils/throwErrorWithStatus');

const getAllAssets = async () => {
  const assets = await Corretora.findAll({
    include: { model: Acao, as: 'acao', 
    attributes: ['company', 'tag', 'value'] } 
  });

  return assets;
}

const getByAsset = async (acaoId) => {
  const asset = await Corretora.findOne({
    where: { acaoId },
    include: { 
      model: Acao, as: 'acao', 
      attributes: ['company', 'tag', 'value'] 
    }
  });

  if (!asset) {
    return throwErroWithStatus({
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Ativo inexistente.'
    });
  }

  return asset;
}

module.exports = {
  getAllAssets,
  getByAsset,
}