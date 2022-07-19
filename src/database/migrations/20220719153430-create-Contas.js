'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ContasTable = queryInterface.createTable('Contas', {
      id :{
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      userId: {
        allowNull:false,
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        field: 'user_id',
        onUpdate: 'CASCADE',
      },
      bankBalance: {
        allowNull: false,
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        field: 'bank_balance',
      }
    });

    return ContasTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Contas')
};