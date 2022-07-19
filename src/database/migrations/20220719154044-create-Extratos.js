'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ExtratosTable = queryInterface.createTable('Extratos', {
      id:{
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      contaId :{
        allowNull:false,
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'Contas',
          key: 'id'
        },
        field: 'conta_id',
        onUpdate: 'CASCADE',
      },
      value: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dateTyme: {
        allowNull: false,
        type: Sequelize.DATE, 
        defaultValue: Sequelize.fn('now'),
        field: 'date_time',
      }
    });

    return ExtratosTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Extratos')
};