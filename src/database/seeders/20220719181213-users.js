/* eslint-disable no-unused-vars */
const ids = require('../helpers/uuids');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: ids.id1,
        user_name: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        password: '123456',
        role: 'user',
      },
      {
        id: ids.id2,
        user_name: 'Cleiton do TI',
        email: 'cleiton@ti.com',
        password: '123456',
        role: 'user',
      },
      {
        id: ids.id3,
        user_name: 'Vitoria Santos',
        email: 'vivi@santos.com',
        password: '123456',
        role: 'user',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};