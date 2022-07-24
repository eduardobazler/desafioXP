const serviceInvestimentos = require('../services/investimentos.service');
const { StatusCodes } = require('http-status-codes');
const checkCount = require('../services/helpers.service/checkMathUserCount');


const buyAssets = async (req, res) => {
  const { contaId, acaoId, qtdeAcao } = req.body;

  const { id: userId } = res.locals.payload;
  await checkCount.checkMathUserCount({contaId, userId});

  const dataResponse = await serviceInvestimentos.serviceBuyAssets({ contaId, acaoId, qtdeAcao });
  res.status(StatusCodes.OK).json(dataResponse);
}

const saleAssets = async (req, res) => {
  const { contaId, acaoId, qtdeAcao } = req.body;

  const { id: userId } = res.locals.payload;
  await checkCount.checkMathUserCount({contaId, userId});

  const dataResponse  = await serviceInvestimentos.serviceSaleAssets({ contaId, acaoId, qtdeAcao });
  res.status(StatusCodes.OK).json(dataResponse);

}

module.exports = {
  buyAssets,
  saleAssets,
}