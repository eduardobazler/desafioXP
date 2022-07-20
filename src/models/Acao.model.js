const AcaoSchema = (sequelize, DataTypes) => {
  const AcaoTable = sequelize.define('Acao', {
    id :{
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    company: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    tag: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    value: {
      allowNull: false,
      type: DataTypes.DOUBLE,
    },
  }, 
  {
    timestamps: false,
    tableName: 'Acoes'
  });

  AcaoTable.associate = (models) => {
    AcaoTable.hasOne(models.Corretora, {
      foreignKey: 'acaoId', as: 'corretora'
    });
  }

  return AcaoTable;
}

module.exports = AcaoSchema;