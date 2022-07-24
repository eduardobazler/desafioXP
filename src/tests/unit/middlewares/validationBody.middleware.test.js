const sinon = require('sinon');
const { expect } = require('chai');

const validationBody = require('../../../middlewares/validationBody.middleware');
const { investimentoBodyDTO, depositoBodyDTO, assetBodyDTO, authBody } = require('../../../utils/objectsJoi');

describe('validationBodymiddleware', () => {
  describe('validationsBodyInvestimento', () => {
    describe('Valida o body da requisição para investimento', () => {

      const mockNext = { next: () => true }
      const req = { body: { contaId: 1, acaoId: 1, qtdeAcao: 10 } }
      const res ={ }

      describe('Deve retorna um erro quando o joi retornar um erro', () => {
        
        const errorJoi = { details: [{ message: 'Erro do Joi' }] } 
        
        before(() => {
          sinon.stub(investimentoBodyDTO, 'validate').returns({ error: errorJoi });
  
        });
        
        after(() => {
          investimentoBodyDTO.validate.restore();
        });
        
        it('Deve retorna um erro', () => {
          expect(() => validationBody.validationsBodyInvestimento(req, res, mockNext)).to.throw('Erro do Joi');  
        });

      });

      describe('Deve chamar a função next', () => {
        
        before(() => {
          sinon.stub(investimentoBodyDTO, 'validate').returns({});
          sinon.stub(mockNext, 'next').resolves(true);
        });
        
        after(() => {
          investimentoBodyDTO.validate.restore();
          mockNext.next.restore();
        });
        
        it('Chama a função next', () => {
          validationBody.validationsBodyInvestimento(req, res, mockNext.next);
          expect(investimentoBodyDTO.validate.calledWith({ contaId: 1, acaoId: 1, qtdeAcao: 10 })).to.be.true;
          expect(mockNext.next.calledWith()).to.be.true; 
        });
      });
    });
  });

  describe('validationsBodyDeposito', () => {
    describe('Valida o body da requisição para deposito', () => {

      const mockNext = { next: () => true }
      const req = { body: { contaId: 1, valor: 10 } }
      const res ={ }

      describe('Deve retorna um erro quando o joi retornar um erro', () => {
        
        const errorJoi = { details: [{ message: 'Erro do Joi' }] } 
        
        before(() => {
          sinon.stub(depositoBodyDTO, 'validate').returns({ error: errorJoi });
  
        });
        
        after(() => {
          depositoBodyDTO.validate.restore();
        });
        
        it('Deve retorna um erro', () => {
          expect(() => validationBody.validationsBodyDeposito(req, res, mockNext)).to.throw('Erro do Joi');  
        });

      });

      describe('Deve chamar a função next', () => {
        
        before(() => {
          sinon.stub(depositoBodyDTO, 'validate').returns({});
          sinon.stub(mockNext, 'next').resolves(true);
        });
        
        after(() => {
          depositoBodyDTO.validate.restore();
          mockNext.next.restore();
        });
        
        it('Chama a função next', () => {
          validationBody.validationsBodyDeposito(req, res, mockNext.next);
          expect(depositoBodyDTO.validate.calledWith({ contaId: 1, valor: 10 })).to.be.true;
          expect(mockNext.next.calledWith()).to.be.true; 
        });
      });
    });
  });


  describe('validationsBodyAsset', () => {
    describe('Valida o body da requisição para uma ação', () => {

      const mockNext = { next: () => true }
      const req = { body: {company: 'xpto', tag: 'xp', value: 100, quantity: 100} }
      const res ={ }

      describe('Deve retorna um erro quando o joi retornar um erro', () => {
        
        const errorJoi = { details: [{ message: 'Erro do Joi' }] } 
        
        before(() => {
          sinon.stub(assetBodyDTO, 'validate').returns({ error: errorJoi });
  
        });
        
        after(() => {
          assetBodyDTO.validate.restore();
        });
        
        it('Deve retorna um erro', () => {
          expect(() => validationBody.validationsBodyAsset(req, res, mockNext)).to.throw('Erro do Joi');  
        });

      });

      describe('Deve chamar a função next', () => {
        
        before(() => {
          sinon.stub(assetBodyDTO, 'validate').returns({});
          sinon.stub(mockNext, 'next').resolves(true);
        });
        
        after(() => {
          assetBodyDTO.validate.restore();
          mockNext.next.restore();
        });
        
        it('Chama a função next', () => {
          validationBody.validationsBodyAsset(req, res, mockNext.next);
          expect(assetBodyDTO.validate.calledWith({company: 'xpto', tag: 'xp', value: 100, quantity: 100})).to.be.true
          expect(mockNext.next.calledWith()).to.be.true; 
        });
      });
    });
  });

  describe('validaeBodyAuth', () => {
    describe('Valida o body da requisição para uma ação', () => {

      const mockNext = { next: () => true }
      const req = { body: { email: 'email', password: 'senha' } }
      const res ={ }

      describe('Deve retorna um erro quando o joi retornar um erro', () => {
        
        const errorJoi = { details: [{ message: 'Erro do Joi' }] } 
        
        before(() => {
          sinon.stub(authBody, 'validate').returns({ error: errorJoi });
  
        });
        
        after(() => {
          authBody.validate.restore();
        });
        
        it('Deve retorna um erro', () => {
          expect(() => validationBody.validaeBodyAuth(req, res, mockNext)).to.throw('Erro do Joi');  
        });

      });

      describe('Deve retorna um erro quando o joi retornar um erro', () => {
        
        before(() => {
          sinon.stub(authBody, 'validate').returns({});
          sinon.stub(mockNext, 'next').resolves(true);
        });
        
        after(() => {
          authBody.validate.restore();
          mockNext.next.restore();
        });
        
        it('Deve retorna um erro', () => {
          validationBody.validaeBodyAuth(req, res, mockNext.next);
          expect(authBody.validate.calledWith({ email: 'email', password: 'senha' })).to.be.true;
          expect(mockNext.next.calledWith()).to.be.true; 
        });
      });
    });
  });

});
