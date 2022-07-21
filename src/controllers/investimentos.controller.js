const serviceInvestimentos = require('../services/investimentos.service');
const { StatusCodes } = require('http-status-codes');

const buyAssets = async (req, res) => {
  const { contaId, acaoId, qtdeAtivo } = req.body;
  const dataResponse = await serviceInvestimentos.serviceBuyAssets({ contaId, acaoId, qtdeAtivo });
  res.status(StatusCodes.OK).send(dataResponse);
}

const saleAssets = async (req, res) => {
  const { contaId, acaoId, qtdeAtivo } = req.body;
  const dataResponse  = await serviceInvestimentos.serviceSaleAssets({ contaId, acaoId, qtdeAtivo });
  res.status(StatusCodes.OK).send(dataResponse);

}

module.exports = {
  buyAssets,
  saleAssets,
}