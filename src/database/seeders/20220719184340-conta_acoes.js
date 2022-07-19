/* eslint-disable no-unused-vars */
const { idConta1, idConta2, idConta3 } = require('../helpers/uuids');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Conta_acoes',
      [{
        conta_id: idConta1,
        acao_id: 1,
        quantity: 15,
      },
      {
        conta_id: idConta1,
        acao_id: 2,
        quantity: 25,
      },
      {
        conta_id: idConta2,
        acao_id: 2,
        quantity: 30,
      },
      {
        conta_id: idConta2,
        acao_id: 1,
        quantity: 60,
      },
      {
        conta_id: idConta2,
        acao_id: 3,
        quantity: 12,
      },
      {
        conta_id: idConta3,
        acao_id: 2,
        quantity: 18,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Conta_acoes', null, {});
  },
};