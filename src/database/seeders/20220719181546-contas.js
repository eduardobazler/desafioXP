/* eslint-disable no-unused-vars */
const { idConta1, idConta2, idConta3, id1, id2, id3 } = require('../helpers/uuids');
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Contas',
      [{
        id: idConta1,
        user_id: id1,
        bank_balance: 8_000,
      },
      {
        id: idConta2,
        user_id: id2,
        bank_balance: 8_000,
      },
      {
        id: idConta3,
        user_id: id3,
        bank_balance: 8_000,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Contas', null, {});
  },
};