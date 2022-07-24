const sinon = require('sinon');
const { expect } = require('chai');

const contaService = require('../../../services/conta.service');
const contaController = require('../../../controllers/conta.controller');
const checkCount = require('../../../services/helpers.service/checkMathUserCount');

describe('Conta Controller', () => {
  describe('accountDeposit', () => {
    describe('Realiza o deposioto na conta do usuário atualizando com o um novo valor', () => { 
      
      const request = {};
      const response = {};
      contaId = 'contaId';
      valor = 500

      before(() => {
        sinon.stub(contaService, 'accountDeposit').resolves({ deposit: true });

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        request.body = { valor, contaId }
      });
  
      after(() => {
        contaService.accountDeposit.restore();
      });

      it('Resposta do service com status 200 e com o valor da camada de servico', async () => {
        await contaController.accountDeposit(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(contaService.accountDeposit.calledWith({ valor, contaId })).to.be.true;
        expect(response.json.calledWith({ deposit: true })).to.be.true;
      });
     });
  });

  describe('accountWithdrawal', () => {
    describe('Chama a funcao para checar as contas e para retirar um valor', () => {

      const request = {};
      const response = {
        locals: { payload: { id: 1 } }
      };

      const contaId = 'contaId';  
      const valor = 500

      before(() => {
        sinon.stub(contaService, 'accountWithdrawal').resolves({ saque: true });
        sinon.stub(checkCount, 'checkMathUserCount').resolves(true);
        
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        request.body = { valor, contaId }
      });
  
      after(() => {
        contaService.accountWithdrawal.restore();
        checkCount.checkMathUserCount.restore();
      });

      it('Resposta do service com status 200 e com o valor da camada de servico', async () => {
        await contaController.accountWithdrawal(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith({ saque: true })).to.be.true;
      });

      it('Chama a função de verificação de conta com os valores corretos', async () => {
        await contaController.accountWithdrawal(request, response);

        expect(checkCount.checkMathUserCount.calledWith({ contaId, userId: 1 })).to.be.true;
        expect(contaService.accountWithdrawal.calledWith({ valor, contaId })).to.be.true;
      });

    });
  });

  describe('getBankBalance', () => {
    describe('Chama a funcao para checar as contas e para pegar o saldo um valor', () => {

      const request = {};
      const response = {
        locals: { payload: { id: 1 } }
      };

      const contaId = 2;  

      before(() => {
        sinon.stub(contaService, 'getBankBalance').resolves({ saldo: true });
        sinon.stub(checkCount, 'checkMathUserCount').resolves(true);
        
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        request.params = { id: contaId }
      });
  
      after(() => {
        contaService.getBankBalance.restore();
        checkCount.checkMathUserCount.restore();
      });

      it('Resposta do service com status 200 e com o valor da camada de servico', async () => {
        await contaController.getBankBalance(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith({ saldo: true })).to.be.true;
      });

      it('Chama a função de verificação de conta com os valores corretos', async () => {
        await contaController.getBankBalance(request, response);

        expect(checkCount.checkMathUserCount.calledWith({ contaId, userId: 1 })).to.be.true;
        expect(contaService.getBankBalance.calledWith(2)).to.be.true;
      });

    });
  });


  describe('getAssets', () => {
    describe('Chama a funcao para checar as contas e para pegar as ações da conta', () => {

      const request = {};
      const response = {
        locals: { payload: { id: 1 } }
      };

      const contaId = 2;  

      before(() => {
        sinon.stub(contaService, 'getAssets').resolves({ assets: true });
        sinon.stub(checkCount, 'checkMathUserCount').resolves(true);
        
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        request.params = { id: contaId }
      });
  
      after(() => {
        contaService.getAssets.restore();
        checkCount.checkMathUserCount.restore();
      });

      it('Resposta do service com status 200 e com o valor da camada de servico', async () => {
        await contaController.getAssets(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith({ assets: true })).to.be.true;
      });

      it('Chama a função de verificação de conta com os valores corretos', async () => {
        await contaController.getAssets(request, response);

        expect(checkCount.checkMathUserCount.calledWith({ contaId, userId: 1 })).to.be.true;
        expect(contaService.getAssets.calledWith(2)).to.be.true;
      });

    });
  });
})