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

const checkAsset = async (company, tag) => {
  const asset = await Acao.findOne({
    where: { company, tag }
   });

   if(asset) {
    return throwErroWithStatus({
      message: 'Asset already exists.',
      status: StatusCodes.UNPROCESSABLE_ENTITY
    });
   }
}

const createAsset = async ({ company, tag, value, quantity }) => {
  await checkAsset(company, tag)
  const newAsset = await Acao.create({ company, tag, value });
  await Corretora.create({ acaoId: newAsset.id, quantity });

  return { acaoId: newAsset.id, company, tag, quantity }
}

module.exports = {
  getAllAssets,
  getByAsset,
  createAsset,
  checkAsset
}