/* eslint-disable no-unused-vars */
const generateHash = require('../../utils/generateHash');
const ids = require('../helpers/uuids');

const senha1 = generateHash('user1');
const senha2 = generateHash('user2');
const senha3 = generateHash('user3');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: ids.id1,
        user_name: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        password: senha1,
        role: 'user',
      },
      {
        id: ids.id2,
        user_name: 'Cleiton do TI',
        email: 'cleiton@ti.com',
        password: senha2,
        role: 'admin',
      },
      {
        id: ids.id3,
        user_name: 'Vitoria Santos',
        email: 'vivi@santos.com',
        password: senha3,
        role: 'user',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};