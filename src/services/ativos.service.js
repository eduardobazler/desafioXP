const { Corretora, Acao } = require('../models');

const getAllAssets = async () => {
  const assets = Corretora.findAll({
    include: { model: Acao, as: 'acao', 
    attributes: ['company', 'tag', 'value'] } 
  });
  
  return assets;
}


module.exports = {
  getAllAssets,
}