const sinon = require('sinon');
const { expect } = require('chai');

const handleError = require('../../../middlewares/handleError.middleware');

describe('handleError', () => {
  describe('Deve retornar o satus e e mensagem de erro correta', () => {

    const request = {};
    const response = {};
    const mockNext = {}

    before(() => {

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

    });

    const next = {};
    const error = { status: 444, message: 'Handle Error' }
    it('Mensagem e status corretos', () => {
      handleError(error, request, response, next);
      expect(response.status.calledWith(444)).to.be.true;
      expect(response.json.calledWith({ message: 'Handle Error' })).to.be.true;
      
    });

  })
})