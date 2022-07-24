const { expect } = require('chai');
const sinon = require('sinon');
const { Corretora, Acao, Conta, ContaAcoes } = require('../../../models');
const quantityValidators = require('../../../services/helpers.service/quantityValidators');

describe('Quantity Validators', () => {

  describe('checkBrokerHasAsset', () => {

    describe('Verifica se a corretora tem o ativo, caso não tenha explode um erro', () => {

      before(() => {
        sinon.stub(Corretora, 'findOne').resolves(null);
      });
  
      after(() => {
        Corretora.findOne.restore();
      });

      it('Explode o erro com o status 422', async () => {
        const acaoId = 1;
        try {
          await quantityValidators.checkBrokerHasAsset(acaoId);
        } catch (error) {
          expect(error.message).to.be.equal('Informações incorretas.');
          expect(error).has.property('status');
          expect(error.status).to.be.equal(422);
        }        
      });
    });

    describe('Verifica se a corretora tem o ativo, retornando a quantidade e valor', () => {

      before(() => {
        sinon.stub(Corretora, 'findOne').resolves({ quantity: 10, acao: { value: 45 } });
      }); 
  
      after(() => {
        Corretora.findOne.restore();
      });

      it('Retorna um objeto com a quantidade e valor', async () => {
        const acaoId = 1;
        const responseService = await quantityValidators.checkBrokerHasAsset(acaoId);
        expect(responseService).to.be.a('object');
        expect(responseService).to.includes.all.keys('qtdeAvailableBroker', 'valorAtivo');
        expect(responseService.qtdeAvailableBroker).to.be.equal(10);
        expect(responseService.valorAtivo).to.be.equal(45);
      });
    });
  });

  describe('checkQuantityAssetsAvailable', () => {
    describe('Verifica se a quantidade requirida á maior que a quantidade disponível', () => {

      it('Explode um erro', () => {
        qtdeDisponivel = 100;
        qtdeRequirida = 101;
        try {
          quantityValidators.checkQuantityAssetsAvailable(qtdeRequirida, qtdeDisponivel);
        } catch (error) {
          expect(error.message).to.be.equal('Quantidade da ação indisponível');
          expect(error).to.have.a.property('status');
          expect(error.status).to.be.equal(422);
        }
      });
    });
  });

  describe('checkBankBalanceUserAvailable', () => {
    describe('Confere o saldo do usuario disponível para a compra de um ativo', () => {
      describe('Caso o saldo seja menor, explode um erro', () => {
        before(() => {
          sinon.stub(Conta, 'findOne').resolves({ bankBalance: 400 });
        }); 
    
        after(() => {
          Conta.findOne.restore();
        });
        
        it('Explode um erro', async () => {
          const qtdeAcao = 45;
          const valorAtivo = 10;
          const contaId = 1
          try {
            const resService = await quantityValidators.checkBankBalanceUserAvailable(qtdeAcao, valorAtivo, contaId);
          } catch (error) {
            expect(error.message).to.be.equal('Saldo bancário não disponível para essa transação.');
            expect(error).to.have.property('status');
            expect(error.status).to.be.equal(422);
          }
        });
      });
      describe('Caso o saldo seja maior, retorna um objeto com a quantia requerida e o saldo', () => {
        before(() => {
          sinon.stub(Conta, 'findOne').resolves({ bankBalance: 400 });
        }); 
    
        after(() => {
          Conta.findOne.restore();
        });
        
        it('Explode um erro', async () => {
          const qtdeAcao = 40;
          const valorAtivo = 10;
          const contaId = 1
          const resService = await quantityValidators.checkBankBalanceUserAvailable(qtdeAcao, valorAtivo, contaId);
          expect(resService).to.be.a('object');
          expect(resService).to.includes.all.keys('amountRequired', 'bankBalance');
          expect(resService.amountRequired).to.be.equal(400);
          expect(resService.bankBalance).to.be.equal(400);
        });
      });
    });
  });

  describe('checkUserHasAsset', () => {
    describe('Verifica se o usuario possui o ativo', () => {

      describe('Caso não possua, explode um erro', () => {

        before(() => {
          sinon.stub(ContaAcoes, 'findOne').resolves(null);
        }); 
    
        after(() => {
          ContaAcoes.findOne.restore();
        });
        
        it('Explode um erro', async () => {
          const acaoId = 10;
          const contaId = 1
          try {
            const resService = await quantityValidators.checkUserHasAsset(contaId, acaoId);
          } catch (error) {
            expect(error.message).to.be.equal('Informações incorretas.');
            expect(error).to.have.property('status');
            expect(error.status).to.be.equal(422);
          }
        });
      });
    });

    describe('Caso o usuario tenha o ativo, retorna a quantidade desse ativo', () => {
      before(() => {
        sinon.stub(ContaAcoes, 'findOne').resolves({ quantity: 70 });
      }); 
  
      after(() => {
        ContaAcoes.findOne.restore();
      });
      
      it('Explode um erro', async () => {
        const acaoId = 10;
        const contaId = 1
        const resService = await quantityValidators.checkUserHasAsset(contaId, acaoId);
        expect(resService).to.be.a('number');
        expect(resService).to.be.equal(70);
      });
    })
  });

})