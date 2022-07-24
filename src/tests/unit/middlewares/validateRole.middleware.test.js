const sinon = require('sinon');
const { expect } = require('chai');

const validateRole = require('../../../middlewares/validateRole.middleware');

describe('ValidateRole', () => {
  describe('Deve retornar um erro 404 com uma mensagem page not founf', () => {

    const request = {};
    const response = { 
      locals: { payload: { role: 'user' } }
    };
    const mockNext = {}

    before(() => {

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

    });

    it('Mensagem de erro not found', () => {
      expect(() => validateRole(request, response, mockNext)).to.throw('page not found');
    });

    it('Status Response 404', () => {
      try {
        validateRole(request, response, mockNext)
      } catch (error) {
        expect(error).to.have.property('status');
        expect(error.status).to.be.equal(404)
      }
    });

  });


  describe('Deve chamar a funcao next', () => {

    const request = {};
    const response = { 
      locals: { payload: { role: 'admin' } }
    };
    const mockNext = { next: () => true }

    before(() => {
      sinon.stub(mockNext, 'next').returns(true);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

    });

    it('Chama a funcao next', () => {
      validateRole(response, response, mockNext.next);
      expect(mockNext.next.calledWith()).to.be.true
    });

  });
})