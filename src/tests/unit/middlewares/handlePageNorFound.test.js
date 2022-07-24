const sinon = require('sinon');
const { expect } = require('chai');

const handlePageNotFound = require('../../../middlewares/handlePageNotFound');

describe('handlePageNotFound', () => {
  describe('Verifica o códgio da resposta e a mensagem de page not found', () => {

    const request = {};
    const response = {  };

    before(() => {

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

    });

    it('status 404 e page not founs', () => {
      handlePageNotFound(request, response);
      expect(response.status.calledWith(404)).to.be.true;
      expect(response.json.calledWith({ message: 'page not found' })).to.be.true
    })
  })
})