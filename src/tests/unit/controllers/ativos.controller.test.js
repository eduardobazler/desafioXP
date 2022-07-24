const sinon = require('sinon');
const { expect } = require('chai');
const ativosService = require('../../../services/ativos.service');
const ativosController = require('../../../controllers/ativos.controller');

describe('Ativos Controller', () => {
  describe('getAllAssets', () => {
    describe('Retorna a resposta da camada de servico com status 200', () => { 
      
      const response = {};
      const request = {};
      const responseService = [{}, {}]
      before(() => {
        sinon.stub(ativosService, 'getAllAssets').resolves(responseService);

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
      });
  
      after(() => {
        ativosService.getAllAssets.restore();
      });

      it('Retornar a lista com o status 200', async () => {
        await ativosController.getAllAssets(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(responseService)).to.be.true;
      });
     });

  });

  describe('getByAsset', () => {
    describe('Retorna a resposta da camada de servico com status 200', () => { 
      
      const response = {};
      const request = {};

      const responseService = { asset: true }
      before(() => {
        sinon.stub(ativosService, 'getByAsset').resolves(responseService);

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        request.params = { id: 1 }
      });
  
      after(() => {
        ativosService.getByAsset.restore();
      });

      it('Retornar o ativo com o status 200', async () => {
        await ativosController.getByAsset(request, response);
        expect(ativosService.getByAsset.calledWith(1)).to.be.true;
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(responseService)).to.be.true;
      });
     });
  });

  describe('createAsset', () => {
    describe('Consome os dados do body da requisicao e retorna um novo ativo com status 200', () => { 
      
      const response = {};
      const request = {};

      const responseService = { asset: true }

      const asset = { company: 'xpto', tag: 'XpInc', value: 33, quantity: 10 } 

      before(() => {
        sinon.stub(ativosService, 'createAsset').resolves(responseService);

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();


        request.body = asset
      });
  
      after(() => {
        ativosService.createAsset.restore();
      });

      it('Retornar o ativo com o status 200', async () => {
        await ativosController.createAsset(request, response);

        expect(ativosService.createAsset.calledWith(asset)).to.be.true;
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(responseService)).to.be.true;
      });
     });
  });
})