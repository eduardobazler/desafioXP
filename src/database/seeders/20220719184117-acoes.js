/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Acoes',
      [{
        company: 'Vale',
        tag: 'VALE3',
        value: 33.56,
      },
      {
        company: 'Alphabet',
        tag: 'GOGL34',
        value: 72.56,
      },
      {
        company: 'Natura',
        tag: 'NTCO3',
        value: 17.56,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Acoes', null, {});
  },
};