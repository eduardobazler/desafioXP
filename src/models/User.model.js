const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'user_name',
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'user',
    }
  }, 
  {
    timestamps: false,
    tableName: 'Users'
  });

  UserTable.associate = (models) => {
    UserTable.hasOne(models.Conta, {
      foreignKey: 'userId', as: 'conta'
    })
  }  

  return UserTable;
}

module.exports = UserSchema;