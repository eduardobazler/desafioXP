const ContaAcoesSchema = (sequelize, DataTypes) => {
  const ContaAcoesTable = sequelize.define('ContaAcoes', {
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
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, 
  {
    timestamps: false,
    tableName: 'Conta_acoes'
  });

  ContaAcoesTable.associate = (model) => {

    model.Conta.belongsToMany(model.Acao, {
      as: 'acoes',
      through: ContaAcoesTable,
      foreignKey: 'contaId',
      otherKey: 'acaoId'
    });
    
    model.Acao.belongsToMany(model.Conta, {
      as: 'contas',
      through: ContaAcoesTable,
      foreignKey: 'acaoId',
      otherKey: 'contaId'
    });
  }

  return ContaAcoesTable;
}

module.exports = ContaAcoesSchema;