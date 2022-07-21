const contaService = require('../services/conta.service');
const { StatusCodes } = require('http-status-codes');

const accountDeposit = async (req, res) => {
  const { codCliente, valor } = req.body;
  const dataResponse = await contaService.accountDeposit({ codCliente, valor });
  res.status(StatusCodes.OK).json(dataResponse);
};

const accountWithdrawal = async (req, res) => {
  const { codCliente, valor } = req.body;
  const dataResponse = await contaService.accountWithdrawal({ codCliente, valor });
  res.status(StatusCodes.OK).json(dataResponse);
}

const getBankBalance = async (req, res) => {
  const { id: codCliente } = req.params;
  const dataResponse = await contaService.getBankBalance(codCliente);
  res.status(StatusCodes.OK).json(dataResponse);
}

const getAssets = async (req, res) => {
  const { id: codCliente } = req.params;
  const dataResponse = await contaService.getAssets(codCliente);
  res.status(StatusCodes.OK).json(dataResponse);
}

module.exports = {
  accountDeposit,
  accountWithdrawal,
  getBankBalance,
  getAssets,
}