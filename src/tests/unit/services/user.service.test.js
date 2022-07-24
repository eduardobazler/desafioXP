const { expect } = require('chai');
const sinon = require('sinon');
const { User, Conta } = require('../../../models');
const userService = require('../../../services/user.service');
const hash = require('../../../utils/generateHash');

describe('User Service', () => {
  describe('checkUsers', ()  => {
    describe('Verifica se axiste algum usuario com o email da requisicao', () => { 
      
      describe('Explode um erro quano a lista vier com algum dado de usuario', () => {

        before(() => {
          sinon.stub(User, 'findAll').resolves([{}]);
        });
    
        after(() => {
          User.findAll.restore();
        });

        it('Explode um erro com status 422', async () => {
          try {
            await userService.checkUsers('email@email.com')
          } catch (error) {
            expect(error.message).to.be.equal('email já existente');
            expect(error).to.have.property('status');
            expect(error.status).to.be.equal(422)
          }
        });
      });

      describe('Caso a lista venha vazia retorna true', () => {

        before(() => {
          sinon.stub(User, 'findAll').resolves([]);
        });
    
        after(() => {
          User.findAll.restore();
        });

        it('Retorna true', async () => {
          const serviceResponse = await userService.checkUsers('email@email.com')
          expect(serviceResponse).to.be.true;
        });
      });
     });
  });

  describe('createUser', () => {
    describe('Cria um novo Usuario e uma nova conta com o id do usuario', () => {

      before(() => {
        sinon.stub(User, 'findAll').resolves([]);
        sinon.stub(hash, 'generateHash').returns('hashGerado');
        sinon.stub(User, 'create').resolves({ id: 2 });
        sinon.stub(Conta, 'create').resolves({ id: 3 });
      });
  
      after(() => {
        User.findAll.restore();
        hash.generateHash.restore();
        User.create.restore();
        Conta.create.restore();
      });

      it('Retorna um objeto com informacoes do usuario', async () => {
        const userName = 'eduardo';
        const email = 'edu@edu.com';
        const password = 'senha';

        const responseService = await userService.createUser({ userName, email, password });
        expect(User.create.calledWith({ email, userName, password: 'hashGerado'})).to.be.true;
        expect(Conta.create.calledWith({ userId: 2 }));
        expect(responseService).to.includes.all.keys('contaId', 'email', 'userName');
        expect(responseService.contaId).to.be.equal(3)
        expect(responseService.email).to.be.equal(email)
        expect(responseService.userName).to.be.equal(userName)
      })

    })
  })
})