const sinon = require('sinon');
const { expect } = require('chai');
const authService = require('../../../services/auth.service');
const authController = require('../../../controllers/auth.controller');

describe('Auth Controller', () => {
  describe('authUser', () => {

    describe('Chama a camada de servico e gera um token', () => {

      const request = {};
      const response = {};

      before(() => {
        sinon.stub(authService, 'authUser').resolves('TokenGgerado')

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        email = 'edu@edu.com';
        password = 'senha123'
        request.body = { email, password }
      });
  
      after(() => {
        authService.authUser.restore();
      });

      it('Retorna um token e o status 200', async () => {
        await authController.authUser(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(authService.authUser.calledWith({ email, password })).to.be.true;
        expect(response.json.calledWith({ token: 'TokenGgerado' })).to.be.true
      });
    });
  });
});