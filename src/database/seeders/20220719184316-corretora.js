/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Corretora',
      [{
        acao_id: 1,
        quantity: 1000,
      },
      {
        acao_id: 2,
        quantity: 3000,
      },
      {
        acao_id: 3,
        quantity: 5000,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Corretora', null, {});
  },
};