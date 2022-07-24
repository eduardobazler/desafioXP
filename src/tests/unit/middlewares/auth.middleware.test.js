const sinon = require('sinon');
const { expect } = require('chai');

const JWT = require('../../../utils/JWTtoken');
const authMiddleware = require('../../../middlewares/auth.middleware');

describe('authMiddleware', () => {
  describe('Verifica se o token existe no header, verifica se o token é valido e chama e executa a função next', () => {

    describe('Caso de sucesso chama a funcao next', () => {
      const request = {
        headers: { authorization: 'token' }
      };
      const response = {
        locals: { payload: {  } }
      };

      const mockNext = { next: () => true  }

      before(() => {
        sinon.stub(JWT, 'authenticateToken').returns({  });
        sinon.stub(mockNext, 'next').returns(true);

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

      });
  
      after(() => {
        JWT.authenticateToken.restore();
        mockNext.next.restore();
      });

      it('Deve chamar a função next', () => {
        authMiddleware(request, response, mockNext.next);
        expect(mockNext.next.calledWith()).to.be.true;
      });

    });

    describe('Explode um erro pois não existe o header authorization', () => {
      const request = {
        headers: {  }
      };
      const response = {
        locals: { payload: {  } }
      };

      const mockNext = { next: () => true  }

      before(() => {
        sinon.stub(JWT, 'authenticateToken').returns({  });
        sinon.stub(mockNext, 'next').returns(true);

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

      });
  
      after(() => {
        JWT.authenticateToken.restore();
        mockNext.next.restore();
      });

      it('Deve explodir o erro', () => {
        expect(() => authMiddleware(request, request, mockNext.next)).to.throw('Expired or invalid token');
      });
    });

    describe('Explode um erro pois a chave é inválida', () => {

      const request = {
        headers: { authorization: 'token' }
      };
      const response = {
        locals: { payload: {  } }
      };

      const mockNext = { next: () => true  }

      before(() => {
        sinon.stub(JWT, 'authenticateToken').returns({ error: true });
        sinon.stub(mockNext, 'next').returns(true);

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

      });
  
      after(() => {
        JWT.authenticateToken.restore();
        mockNext.next.restore();
      });

      it('Deve explodir um erro', () => {
        expect(() => authMiddleware(request, response, mockNext.next)).to.throw('Expired or invalid token');
      });
    });

  })
})