'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ContaAcoesTable = queryInterface.createTable('Conta_acoes', {
      contaId :{
        allowNull:false,
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'Contas',
          key: 'id',
        },
        field: 'conta_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      acaoId :{
        allowNull:false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Acoes',
          key: 'id'
        },
        field: 'acao_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      quantity: {
        allowNull: true,
        type: Sequelize.INTEGER,
      }
    });

    return ContaAcoesTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Conta_acoes')
};