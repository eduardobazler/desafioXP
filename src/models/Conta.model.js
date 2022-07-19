const ContaSchema = (sequelize, DataTypes) => {
  const ContaTable = sequelize.define('Conta', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      field: 'user_name',
    },
    bankBalance: {
      allowNull: false,
      type: DataTypes.DOUBLE,
      defaultValue: 0.00,
      field: 'bank_balance',
    }
  }, 
  {
    timestamps: false,
    tableName: 'Contas'
  });

  ContaTable.associate = (models) => {
    ContaTable.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user'
    });
  }

  return ContaTable;
}

module.exports = ContaSchema;