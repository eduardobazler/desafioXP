'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const HistoricoTable = queryInterface.createTable('Historico', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      contaId :{
        allowNull:false,
        type: Sequelize.UUID,
        references: {
          model: 'Contas',
          key: 'id'
        },
        field: 'conta_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      acaoId :{
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Acoes',
          key: 'id'
        },
        field: 'acao_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      typeOrder: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'type_order',
      },
      quantity: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      dateOrder: {
        allowNull: false,
        type: Sequelize.DATE, 
        defaultValue: Sequelize.fn('now'),
        field: 'date_order',
      }
    });

    return HistoricoTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Historico')
};