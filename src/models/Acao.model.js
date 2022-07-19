'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const AcoesTable = queryInterface.createTable('Acoes', {
      id :{
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      company: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tag: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      value: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
    });

    AcoesTable.associate = (models) => {
      AcoesTable.hasOne(models.Conta, {
        foreignKey: 'acaoId', as: 'corretora'
      })
    }  

    return AcoesTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Acoes')
};