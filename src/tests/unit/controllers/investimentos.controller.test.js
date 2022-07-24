const sinon = require('sinon');
const { expect } = require('chai');

const checkCount = require('../../../services/helpers.service/checkMathUserCount');
const investimentosService = require('../../../services/investimentos.service');
const investimentosController = require('../../../controllers/investimentos.controller');

describe('Investimentos Controllers', () => {
  describe('buyAssets', () => {
    describe('Chama a camada de servico para verifcar as informações da conta e a camada de servico para comprar uma ação', () => { 
      
      const request = {};
      const response = {
        locals: { payload: { id: 1 } }
      };
      const contaId = 10;
      const acaoId = 3
      const qtdeAcao = 15

      before(() => {
        sinon.stub(investimentosService, 'serviceBuyAssets').resolves({ buy: true });
        sinon.stub(checkCount, 'checkMathUserCount').resolves(true);

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        request.body = { acaoId, contaId, qtdeAcao }
      });
  
      after(() => {
        investimentosService.serviceBuyAssets.restore();
        checkCount.checkMathUserCount.restore();
      });

      it('Resposta do service com status 200 e com o valor da camada de servico', async () => {
        await investimentosController.buyAssets(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith({ buy: true })).to.be.true;
      });

      it('Chama a função de verificação e de compra com os valores corretos', async () => {
        await investimentosController.buyAssets(request, response);

        expect(checkCount.checkMathUserCount.calledWith({ contaId, userId: 1 })).to.be.true;
        expect(investimentosService.serviceBuyAssets.calledWith({ contaId, acaoId, qtdeAcao })).to.be.true;
      });

     });
  });

  describe('saleAssets', () => {
    describe('Chama a camada de servico para verifcar as informações da conta e a camada de servico para vender uma ação', () => { 
      
      const request = {};
      const response = {
        locals: { payload: { id: 1 } }
      };
      const contaId = 10;
      const acaoId = 3
      const qtdeAcao = 15

      before(() => {
        sinon.stub(investimentosService, 'serviceSaleAssets').resolves({ sale: true });
        sinon.stub(checkCount, 'checkMathUserCount').resolves(true);

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        request.body = { acaoId, contaId, qtdeAcao }
      });
  
      after(() => {
        investimentosService.serviceSaleAssets.restore();
        checkCount.checkMathUserCount.restore();
      });

      it('Resposta do service com status 200 e com o valor da camada de servico', async () => {
        await investimentosController.saleAssets(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith({ sale: true })).to.be.true;
      });

      it('Chama a função de verificação e de compra com os valores corretos', async () => {
        await investimentosController.saleAssets(request, response);

        expect(checkCount.checkMathUserCount.calledWith({ contaId, userId: 1 })).to.be.true;
        expect(investimentosService.serviceSaleAssets.calledWith({ contaId, acaoId, qtdeAcao: 10 })).to.be.false;
        expect(investimentosService.serviceSaleAssets.calledWith({ contaId, acaoId, qtdeAcao: 15 })).to.be.true;

      });

     });
  });
})