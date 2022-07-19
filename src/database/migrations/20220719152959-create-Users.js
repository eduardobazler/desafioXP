'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('Users', {
      id :{
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'user_name',
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'user'
      }
    });

    return UsersTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Users')
};