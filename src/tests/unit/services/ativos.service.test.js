const { expect } = require('chai');
const sinon = require('sinon');
const ativosService  = require('../../../services/ativos.service');
const { Corretora, Acao } = require('../../../models');

describe('Ativos Service ', () => { 

  describe('getAllAssets', () => {
    
    describe('Deve retornar diretamente a resposta da camada de models', () => {

      const responseModel = [{ }, { }];
      before(() => {
        sinon.stub(Corretora, 'findAll').resolves(responseModel);
      });

      after(() => {
        Corretora.findAll.restore();
      })

      it('recebe um array', async () => {
        const responseService = await ativosService.getAllAssets();
        expect(responseService).to.be.a('array');
        expect(responseService).to.be.equal(responseModel);
      })
    });
  });

  describe('getByAsset', () => {

    describe('Quando a ação não exista', () => {
      const responseModel = null
      before(() => {
        sinon.stub(Corretora, 'findOne').resolves(responseModel);
      });

      after(() => {
        Corretora.findOne.restore();
      });

      it('Deve receber um Error com status 422', async () => {
        try {
          const responseService = await ativosService.getByAsset(1);
          expect(responseService).to.be.equal(responseModel)
        } catch (e) {
          expect(e.message).to.equal('Ativo inexistente.');
          expect(e).to.key('status');
          expect(e.status).to.be.equal(422)
        }
      });
    });

    describe('Quando a ação existe', () => {
      const responseModel = { respostaModel: true }
      before(() => {
        sinon.stub(Corretora, 'findOne').resolves(responseModel);
      });

      after(() => {
        Corretora.findOne.restore();
      });

      it('Deve retornar a mesma resposta da model', async () => {
        const responseService = await ativosService.getByAsset(1);
        expect(responseService).to.be.equal(responseModel);
      });
    });
  });

  describe('checkAsset', () => {

    describe('Se a resposta da model for diferente de null ele joga um erro', () => {
      const responseModel = { };
      before(() => {
        sinon.stub(Acao, 'findOne').resolves(responseModel);
      });

      after(() => {
        Acao.findOne.restore();
      });

      it('Deve retornar um erro no código com status 422', async () => {
        try {
          await ativosService.checkAsset(1);
        } catch (error) {
          expect(error.message).to.be.equal('Asset already exists.');
          expect(error).to.have.key('status');
          expect(error.status).to.be.equal(422);
        }
      });
    });

    describe('Caso o model retorne null a função não retorno', () => {
      const responseModel = null;
      before(() => {
        sinon.stub(Acao, 'findOne').resolves(responseModel);
      });

      after(() => {
        Acao.findOne.restore();
      });

      it('Retorna undefined', async () => {
        const serviceResponse = await ativosService.checkAsset(1);
        expect(serviceResponse).to.be.a('undefined');
      })
    });

  });

  describe('createAsset', () => {

    describe('Deve explodir um erro caso já exista a funcao', () => {

      const responseModel = {};
      const asset = { 
        company: 'xp', 
        tag: 'xp', 
        value: 30, 
        quantity: 10 }
      before(() => {
        sinon.stub(Acao, 'findOne').resolves(responseModel);
      });

      after(() => {
        Acao.findOne.restore();
      });

      it('Explode um erro no código', async () => {
        try {
          await ativosService.createAsset(asset);
        } catch (error) {
          expect(error.message).to.be.equal('Asset already exists.');
          expect(error).to.have.key('status');
          expect(error.status).to.be.equal(422);
        }
      });
    });

    describe('Deve retornar um objeto com a epecificacoes', () => {

      const responseModelAcaoCreate = { id: 3 };

      const asset = { company: 'xp', tag: 'xp', value: 30, quantity: 10 }

      before(() => {
        sinon.stub(Acao, 'findOne').resolves(null);
        sinon.stub(Acao, 'create').resolves(responseModelAcaoCreate);
        sinon.stub(Corretora, 'create').resolves('');
      });

      after(() => {
        Acao.findOne.restore();
        Acao.create.restore();
        Corretora.create.restore();
      });

      it('Explode um erro no código', async () => {
        const responseService = await ativosService.createAsset(asset);
        expect(responseService).to.be.a('object');
        expect(responseService).to.includes.all.keys('acaoId','company', 'quantity', 'tag');
        expect(responseService.acaoId).to.be.equal(3);
        expect(responseService.tag).to.be.equal(asset.tag);
        expect(responseService.company).to.be.equal(asset.company);
        expect(responseService.quantity).to.be.equal(asset.quantity);
      });
    });

  })
  
 })