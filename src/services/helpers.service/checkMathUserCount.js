const { StatusCodes } = require('http-status-codes');
const { Conta } = require('../../models');
const throwErrorWithStatus = require('../../utils/throwErrorWithStatus');
const checkMathUserCount = async ({contaId, userId}) => {
  const isMath = await Conta.findOne({
    where: { id: contaId, userId}
  });

  if (!isMath) {
    return throwErrorWithStatus({
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Informações incorretas.'
    });
  };
}

module.exports = {checkMathUserCount};