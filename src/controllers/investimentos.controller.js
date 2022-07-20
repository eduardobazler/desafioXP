const serviceInvestimentos = require('../services/investimentos.service');
const { StatusCodes } = require('http-status-codes');

const buyAssets = async (req, res) => {
  const { codCliente, codAtivo, qtdeAtivo } = req.body;
  const dataResponse = await serviceInvestimentos.serviceBuyAssets({ codCliente, codAtivo, qtdeAtivo });
  res.status(StatusCodes.OK).send(dataResponse);
}

module.exports = {
  buyAssets,
}