const { StatusCodes } = require('http-status-codes');
const { investimentoBodyDTO, depositoBodyDTO, assetBodyDTO, authBody } = require('../utils/objectsJoi');
const throwErrorWithStatus = require('../utils/throwErrorWithStatus');


const validationsBodyInvestimento = (req, _res, next) => {
  const { contaId, acaoId, qtdeAcao } = req.body;
  const { error } = investimentoBodyDTO.validate({ contaId, acaoId, qtdeAcao });

  if (!error) return next();

  const [{ message }] = error.details;
  throwErrorWithStatus({ message, status: StatusCodes.BAD_REQUEST });
}

const validationsBodyDeposito = (req, _res, next) => {
  const { contaId, valor } = req.body;
  const { error } = depositoBodyDTO.validate({ contaId, valor});

  if (!error) return next();

  const [{ message }] = error.details;
  throwErrorWithStatus({ message, status: StatusCodes.BAD_REQUEST });
}

const validationsBodyAsset = (req, _res, next) => {
  const { company, tag, value, quantity } = req.body;
  const { error } = assetBodyDTO.validate({ company, tag, value, quantity });

  if (!error) return next();

  const [{ message }] = error.details;
  throwErrorWithStatus({ message, status: StatusCodes.BAD_REQUEST });
}

const validaeBodyAuth = (req, _res, next) => {
  const { email, password } = req.body;
  const { error } = authBody.validate({ email, password });

  if (!error) return next();

  const [{ message }] = error.details;
  throwErrorWithStatus({ message, status: StatusCodes.BAD_REQUEST });
}

module.exports = {
  validationsBodyInvestimento,
  validationsBodyDeposito,
  validationsBodyAsset,
  validaeBodyAuth
}