const CorretoraSchema = (sequelize, DataTypes) => {
  const CorretoraTable = sequelize.define('Corretora', {
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
    tableName: 'Corretora'
  });

  CorretoraTable.associate = (model) => {
    CorretoraTable.belongsTo(model.Acao, {
      foreignKey: 'acaoId',
      as: 'acao'
    });
  }

  return CorretoraTable;
}

module.exports = CorretoraSchema;