/* eslint-disable no-unused-vars */
const { idConta1, idConta2, idConta3 } = require('../helpers/uuids')

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Historico',
      [{
        id: 1,
        conta_id: idConta1,
        acao_id: 1,
        quantity: 15,
        type_order: 'compra',
      },
      {
        id: 2,
        conta_id: idConta1,
        acao_id: 2,
        quantity: 25,
        type_order: 'compra',
      },
      {
        id: 3,
        conta_id: idConta2,
        acao_id: 2,
        quantity: 30,
        type_order: 'compra',
      },
      {
        id: 4,
        conta_id: idConta2,
        acao_id: 1,
        quantity: 60,
        type_order: 'compra',
      },
      {
        id: 5,
        conta_id: idConta2,
        acao_id: 3,
        quantity: 12,
        type_order: 'compra',
      },
      {
        id: 6,
        conta_id: idConta3,
        acao_id: 2,
        quantity: 18,
        type_order: 'compra',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Historico', null, {});
  },
};