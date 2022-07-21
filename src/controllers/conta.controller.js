const contaService = require('../services/conta.service');
const { StatusCodes } = require('http-status-codes');

const accountDeposit = async (req, res) => {
  const { codCliente, valor } = req.body;
  const dataResponse = await contaService.accountDeposit({ codCliente, valor });
  res.status(StatusCodes.OK).json(dataResponse);
};

module.exports = {
  accountDeposit,
}