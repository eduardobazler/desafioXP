const HistoricoSchema = (sequelize, DataTypes) => {
  const HistoricoTable = sequelize.define('Corretora', {
    contaId :{
      allowNull:false,
      type: DataTypes.UUID,
      field: 'conta_id',
    },
    acaoId :{
      allowNull:false,
      type: DataTypes.INTEGER,
      field: 'acao_id',
    },
    typeOrder: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'type_order',
    },
    dateOrder: {
      allowNull: false,
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW,
      field: 'date_order',
    }
  }, 
  {
    timestamps: false,
    tableName: 'Historico'
  });

  HistoricoTable.associate = (model) => {

    model.Conta.belongsToMany(model.Acao, {
      as: 'acoes',
      through: HistoricoTable,
      foreignKey: 'contaId',
      otherKey: 'acaoId'
    });
    
    model.Acao.belongsToMany(model.Conta, {
      as: 'contas',
      through: HistoricoTable,
      foreignKey: 'acaoId',
      otherKey: 'contaId'
    });
  }

  return HistoricoTable;
}

module.exports = HistoricoSchema;