const sinon = require('sinon');
const { expect } = require('chai');
const userController = require('../../../controllers/user.controller');
const userService = require('../../../services/user.service');

describe('User Controller', () => {
  describe('createUser', () => {
    describe('Chama o servico de criacao de um usuario e retorna a resposta com o status 200', () => { 
      
      const response = {};
      const request = {};

      const responseService = { user: true }

      const newUser = { userName: 'eduardo', email: 'edu@edu.com', password: 'senha123' } 

      before(() => {
        sinon.stub(userService, 'createUser').resolves(responseService);

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        request.body = newUser;
      });
  
      after(() => {
        userService.createUser.restore();
      });

      it('Retornar o ativo com o status 200', async () => {
        await userController.createUser(request, response);

        expect(userService.createUser.calledWith(newUser)).to.be.true;
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(responseService)).to.be.true;
      });
     });
  });
})
