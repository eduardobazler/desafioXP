const { expect } = require('chai');
const sinon = require('sinon');
const { ContaAcoes, Corretora, Historico, Conta } = require('../../../models');
const quantityUpdaters = require('../../../services/helpers.service/quantityUpdaters');

describe('Quantity Updaters', () => {

  const contaId = 1;
  const acaoId = 1;
  const qtdeAcao = 10;
  const transaction = 'transaction';
  describe('updateBuyAssetsAccount', () => { 
    
    describe('Se a resposta da model for null deve criar a relação', () => {
      before(() => {
        sinon.stub(ContaAcoes, 'findOne').resolves(null);
        sinon.stub(ContaAcoes, 'create').resolves({ create: true });
      });
  
      after(() => {
        ContaAcoes.findOne.restore();
        ContaAcoes.create.restore();
      })

      it('Retorna o resultado da função create', async () => {
        const responseService = await quantityUpdaters.updateBuyAssetsAccount(contaId, acaoId, qtdeAcao, transaction);
        expect(ContaAcoes.create.calledWith({ contaId, acaoId, quantity: qtdeAcao }, { transaction })).to.be.true;
        expect(responseService).to.be.a('object');
        expect(responseService).to.have.property('create');
        expect(responseService.create).to.be.equal(true);
      });
    });

    describe('Se houver resposta do modeu deve atualizar a relação aumentado a quantidade', () => {
      before(() => {
        const respondeFinOnde = { quantity: 5 }
        sinon.stub(ContaAcoes, 'findOne').resolves(respondeFinOnde);
        sinon.stub(ContaAcoes, 'update').resolves({ update: true });
      });
  
      after(() => {
        ContaAcoes.findOne.restore();
        ContaAcoes.update.restore();
      })

      it('Retorna o resultado da função update somando o valor que existia', async () => {
        const responseService = await quantityUpdaters.updateBuyAssetsAccount(contaId, acaoId, qtdeAcao, transaction);

        const newQuantity = 15;

        expect(ContaAcoes.update.calledWith({ quantity: qtdeAcao })).to.be.false;

        expect(ContaAcoes.update.calledWith({ quantity: newQuantity })).to.be.true;

        expect(responseService).to.be.a('object');
        expect(responseService).to.have.property('update');
        expect(responseService.update).to.be.equal(true);
      });
    });
   });

  describe('upadteBuyAssetsBroker', () => {

    describe('Atualiza o valor da quantidade de ativos da corretora', () => {

      before(() => {
        sinon.stub(Corretora, 'update').resolves({  });
      });
  
      after(() => {
        Corretora.update.restore();
      });

      it('Chama a fução update com uma nova quantidade', async () => {
        const qtdeAvailable = 100;
        const newQuantity = 90;
        await quantityUpdaters.upadteBuyAssetsBroker(acaoId, qtdeAcao, qtdeAvailable, transaction)
        expect(Corretora.update.calledWith({ quantity: newQuantity }, {
          where: { acaoId },
          transaction })).to.be.true;

        expect(Corretora.update.calledWith({ quantity: 100 }, {
          where: { acaoId },
          transaction })).to.be.false;
      });

    });
  });

  describe('updateBankBalanceBuy', () => {
    describe('Atualiza o saldo do usuario retirando o valor do gasto com o ativo', () => {

      before(() => {
        sinon.stub(Conta, 'update').resolves({  });
      });
  
      after(() => {
        Conta.update.restore();
      });

      it('Chama a função ipdate com o novo saldo', async () => {
        const bankBalance = 600;
        const amountRequired = 100;
        const newBankBalance = 500;

        await quantityUpdaters.updateBankBalanceBuy(amountRequired, bankBalance, contaId, transaction);
        expect(Conta.update.calledWith({ bankBalance: newBankBalance }, {
          where: { id: contaId },
          transaction
        })).to.true;

        expect(Conta.update.calledWith({ bankBalance: 600 }, {
          where: { id: contaId },
          transaction
        })).to.false
      })
    });
  });

  describe('upadateHistoryOrders', () => {
    
    describe('Cria um novo hitórico', () => {

      before(() => {
        sinon.stub(Historico, 'create').resolves({ });
      });
  
      after(() => {
        Historico.create.restore();
      });

      it('Chama a funcao create com os parametros corretos', async () => {
        const type = 'tipo da ordem';
        await quantityUpdaters.upadateHistoryOrders(type, contaId, acaoId, qtdeAcao, transaction);
        expect(Historico.create.calledWith({ 
          contaId,
          acaoId,
          quantity: qtdeAcao,
          typeOrder: type,
         }, { transaction })).to.be.true;

         expect(Historico.create.calledWith({ 
          contaId: 9,
          acaoId,
          quantity: qtdeAcao,
          typeOrder: type,
         }, { transaction })).to.be.false;
      });
    });
  });

  describe('upadteSaleAssetsBroker', () => {
    describe('Atualiza a quantidade de ativos na corretora somando-os', () => {

      before(() => {
        sinon.stub(Corretora, 'update').resolves({ });
        sinon.stub(Corretora, 'findOne').resolves({ quantity: 100 });
      });
  
      after(() => {
        Corretora.update.restore();
        Corretora.findOne.restore();
      });

      it('Chama a função com o valor atualizado somando-o', async () => {
        await quantityUpdaters.upadteSaleAssetsBroker(acaoId, qtdeAcao, transaction);
        const newQuantity = 100 + qtdeAcao;
        expect(Corretora.findOne.calledWith({ where: { acaoId: acaoId } })).to.be.true;

        expect(Corretora.update.calledWith({ quantity: 100 }, {
          where: { acaoId },
          transaction
        })).to.be.false;

        expect(Corretora.update.calledWith({ quantity: newQuantity }, {
          where: { acaoId },
          transaction
        })).to.be.true;
      });
    });
  });

  describe('updateSaleAssetsAccount', () => {

    describe('Atualiza o valor de ativos do usuario', () => {
      before(() => {
        sinon.stub(ContaAcoes, 'update').resolves({ });
      });
  
      after(() => {
        ContaAcoes.update.restore();
      });

      it('chama a funcao update com um novo valor', async () => {
        const qtdeAvailable = 100;
        const newQuantity = qtdeAvailable - qtdeAcao; // 90
        await quantityUpdaters.updateSaleAssetsAccount(acaoId, qtdeAcao, qtdeAvailable, contaId, transaction);
        expect(ContaAcoes.update.calledWith({ quantity: newQuantity }, {
          where: { acaoId, contaId },
          transaction
        })).to.be.true;

        expect(ContaAcoes.update.calledWith({ quantity: 100 }, {
          where: { acaoId, contaId },
          transaction
        })).to.be.false;
      });

    });
  });
});