const { expect } = require('chai');
const sinon = require('sinon');
const { Conta } = require('../../../models');
const {checkMathUserCount} = require('../../../services/helpers.service/checkMathUserCount');

describe('checkMathUserCount', () => {

  describe('Quando não houver math explode um erro no código', () => {
    const responseModel = null;
    before(() => {
      sinon.stub(Conta, 'findOne').resolves(responseModel);
    });

    after(() => {
      Conta.findOne.restore();
    })

    it('Explode o erro com o status 422', async () => {
      try {
        await checkMathUserCount({contaId: 1, userId: 1})
      } catch (error) {
        expect(error.message).to.be.equal('Informações incorretas.');
        expect(error).to.be.key('status');
        expect(error.status).to.be.equal(422);
      }
    });
  });

  describe('Quando houver math não retorna nada', () => {
    const responseModel = { };
    before(() => {
      sinon.stub(Conta, 'findOne').resolves(responseModel);
    });

    after(() => {
      Conta.findOne.restore();
    })

    it('Retorna undefined', async () => {
      const responseService = await checkMathUserCount({contaId: 1, userId: 1});
      expect(responseService).to.be.a('undefined');
    });
  });

})