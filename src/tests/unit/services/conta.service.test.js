const { expect } = require('chai');
const sinon = require('sinon');
const { Conta, Acao } = require('../../../models');

const contaService = require('../../../services/conta.service');

describe('Conta Serivce', () => {
  describe('checkAcount', () => {
    describe('Checa se aconta do usuário existe, caso não existe explode um erro', () => {

      before(() => {
        sinon.stub(Conta, 'findOne').resolves(null);
      });
  
      after(() => {
        Conta.findOne.restore();
      });
      
      it('Explode um erro com o código 400', async () => {
        try {
          const responseService = await contaService.checkAcount(1);
        } catch (error) {
          expect(error.message).to.be.equal('Dados inválidos.');
          expect(error).to.have.property('status');
          expect(error.status).to.be.equal(400)
        }
      });
    });
    describe('Checa se aconta do usuário existe e devolve a conta em forma de objeto', () => {

      responseModel = { model: true }
      before(() => {
        sinon.stub(Conta, 'findOne').resolves(responseModel);
      });
  
      after(() => {
        Conta.findOne.restore();
      });
      
      it('Explode um erro com o código 400', async () => {
        const responseService = await contaService.checkAcount(1);
        expect(responseService).to.be.equal(responseModel);
      });
    });
  });
  describe('updateAmountMoneyAccount', () => {
    describe('Atualiza o saldo do usuário', () => {

      before(() => {
        sinon.stub(Conta, 'update').resolves({});
      });
  
      after(() => {
        Conta.update.restore();
      });

      it('Chama a funcao update com os valores corretos', async () => {
        const contaId = 1;
        const currentValue = 2000;
        await contaService.updateAmountMoneyAccount(contaId, currentValue);
        expect(Conta.update.calledWith({ bankBalance: currentValue }, 
          { where: { id: contaId } })).to.be.true;
      });
    });
  });

  describe('accountDeposit', () => {
    describe('Calcula o valor anterior mais o valor depoistado para atualizar a conta', () => {

      before(() => {
        sinon.stub(Conta, 'findOne').resolves({ bankBalance: 300 });
        sinon.stub(Conta, 'update').resolves();
      });
  
      after(() => {
        Conta.update.restore();
        Conta.findOne.restore();

      });

      it('Calcula o valor atual e retornado um objeto com o valor depositado', async () => {
        const contaId = 1;
        const valor = 400;
        const novoSaldo = 700;
        const responseService = await contaService.accountDeposit({ contaId, valor });
        expect(Conta.update.calledWith({ bankBalance: novoSaldo })).to.be.true;
        expect(Conta.update.calledWith({ bankBalance: 400 })).to.be.false;
        expect(responseService).to.includes.all.keys('contaId', 'valor', 'status');
      });
    });
  });

  describe('accountWithdrawal', () => {
    describe('Retira o valor solicitado da conta do usuario', () => {

      describe('Se a quantidade solicitada for maior que o saldo, explode um erro', () => {

        before(() => {
          sinon.stub(Conta, 'findOne').resolves({ bankBalance: 300 });
          sinon.stub(Conta, 'update').resolves();
        });
    
        after(() => {
          Conta.update.restore();
          Conta.findOne.restore();
  
        });

        it('Explode o erro com o status 422', async () => {
          try {
            await contaService.accountWithdrawal({contaId: 1, valor: 350})
          } catch (error) {
            expect(error.message).to.be.equal('Valor indisponível.');
            expect(error).to.have.property('status');
            expect(error.status).to.be.equal(422);
          }
        });

      });

      describe('Se a quantidade estiver contida no saldo, retira o valor e retorna um objeto de confirmacao', () => {

        before(() => {
          sinon.stub(Conta, 'findOne').resolves({ bankBalance: 400 });
          sinon.stub(Conta, 'update').resolves();
        });
    
        after(() => {
          Conta.update.restore();
          Conta.findOne.restore();
  
        });

        it('Explode o erro com o status 422', async () => {
          const novoSaldo = 400 - 350;
          const serviceResponse =  await contaService.accountWithdrawal({contaId: 1, valor: 350});
          expect(serviceResponse).to.be.a('object');
          expect(serviceResponse).to.includes.all.keys('contaId', 'valor', 'status');
          expect(Conta.update.calledWith({ bankBalance: novoSaldo })).to.be.true;
        });

      });

    });
  });

  describe('getBankBalance', () => {
    describe('Pega o saldo da conta do usuario', () => {

      before(() => {
        sinon.stub(Conta, 'findOne').resolves({ bankBalance: 400 });
      });
  
      after(() => {
        Conta.findOne.restore();

      });

      it('Retorna um objeto com o saldo', async () => {

        const responseService = await contaService.getBankBalance(1);
        expect(responseService).to.be.a('object');
        expect(responseService).to.includes.all.keys('contaId', 'saldo');
        expect(responseService.saldo).to.be.equal(400);
        expect(responseService.contaId).to.be.equal(1);
      });
    });
  });
  describe('getAssets', () => {
    describe('Pega os ativos do usuario', () => {

      before(() => {
        sinon.stub(Conta, 'findOne').resolves({ acoes: [{}, {}] });
      });
  
      after(() => {
        Conta.findOne.restore();

      });

      it('Retorna um objeto com o id da conta e a lista de ações', async () => {
        const contaId = 1;
        const responseService = await contaService.getAssets(contaId);
        expect(responseService).to.be.a('object');
        expect(responseService).to.includes.all.keys('contaId', 'acoes');
        expect(responseService.acoes).to.be.a('array');
        expect(responseService.contaId).to.be.equal(contaId);
        expect(Conta.findOne.calledWith({ where: { id: contaId}, attributes: ['id'],
          include: { model: Acao, as: 'acoes', through: { attributes: ['quantity'] }} })).to.be.true
      });
    });
  });

})