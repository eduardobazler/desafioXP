const contaService = require('../services/conta.service');
const { StatusCodes } = require('http-status-codes');
const checkMathUserCount = require('../services/helpers.service/checkMathUserCount');

const accountDeposit = async (req, res) => {
  const { contaId, valor } = req.body;
  const dataResponse = await contaService.accountDeposit({ contaId, valor });
  res.status(StatusCodes.OK).json(dataResponse);
};

const accountWithdrawal = async (req, res) => {
  const { contaId, valor } = req.body;

  const { id: userId } = res.locals.payload;
  await checkMathUserCount({contaId, userId});

  const dataResponse = await contaService.accountWithdrawal({ contaId, valor });
  res.status(StatusCodes.OK).json(dataResponse);
}

const getBankBalance = async (req, res) => {
  const { id: contaId } = req.params;

  const { id: userId } = res.locals.payload;
  await checkMathUserCount({contaId, userId});

  const dataResponse = await contaService.getBankBalance(contaId);
  res.status(StatusCodes.OK).json(dataResponse);
}

const getAssets = async (req, res) => {
  const { id: contaId } = req.params;

  const { id: userId } = res.locals.payload;
  await checkMathUserCount({contaId, userId});

  const dataResponse = await contaService.getAssets(contaId);
  res.status(StatusCodes.OK).json(dataResponse);
}

module.exports = {
  accountDeposit,
  accountWithdrawal,
  getBankBalance,
  getAssets,
}