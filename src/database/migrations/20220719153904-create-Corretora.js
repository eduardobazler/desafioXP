'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const CorretoraTable = queryInterface.createTable('Corretora', {
      acaoId :{
        allowNull:false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Acoes',
          key: 'id'
        },
        field: 'acao_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      }
    });

    return CorretoraTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Corretora')
};