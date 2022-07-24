const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const JWT = require('../../../utils/JWTtoken');
const { User } = require('../../../models');
const authService = require('../../../services/auth.service');

describe('Auth Service', () => {
  describe('comparePassword', () => {
    describe('Compara a senha da requisição com a do usuario', () => {

      describe('Caso as senhas sejam imcompativeis, explode um erro', () => {

        before(() => {
          sinon.stub(bcrypt, 'compareSync').returns(false);
        });
    
        after(() => {
          bcrypt.compareSync.restore();
        });

        it('Explode o erro com status 400', () => {
          try {
            const responseService = authService.comparePassword('senhaReq', 'senhaDB');
          } catch (error) {
            expect(error.message).to.be.equal('Invalid fields');
            expect(error).to.have.property('status');
            expect(error.status).to.be.equal(400)
          }
        });
      });

      describe('Caso as senhas sejam imcompativeis, explode um erro', () => {

        before(() => {
          sinon.stub(bcrypt, 'compareSync').returns(true);
        });
    
        after(() => {
          bcrypt.compareSync.restore();
        });

        it('Returna true', () => {
          const responseService = authService.comparePassword('senha', 'senha');
          expect(responseService).to.be.true;
        });
      });
    });
  });

  describe('authUser', () => {
    describe('Encontra o User no banco de dados, compara as senhas e gera um token', () => {
      describe('Caso o user não existe explode um erro', () => { 
        
        before(() => {
          sinon.stub(User, 'findOne').resolves(null);
        });
    
        after(() => {
          User.findOne.restore();
        });

        it('Explode o erro', async () => {
          try {
            const token = await authService.authUser(1);
          } catch (error) {
            expect(error.message).to.be.equal('Invalid fields');
            expect(error).to.have.property('status');
            expect(error.status).to.be.equal(400)
          }
        });
       });

        describe('Quano usuario existe retorna um token', () => { 
          
          const dataValues = {
            id: 1, 
            userName:'eduardo', 
            password: 'senha', 
            email: 'edu@edu', 
            role: 'admin' 
          }

          before(() => {
            sinon.stub(User, 'findOne').resolves({ dataValues });
            sinon.stub(bcrypt, 'compareSync').returns(true);
            sinon.stub(JWT, 'generateToken').returns('meuToken');
          });
      
          after(() => {
            User.findOne.restore();
            bcrypt.compareSync.restore();
            JWT.generateToken.restore();
          });

          it('Explode o erro', async () => {
            const token = await authService.authUser(1);
            expect(token).to.be.equal('meuToken');
          });
       });
    });
  })
})