module.exports = (sequelize, DataTypes) => {
  const ApiClient = sequelize.define('apiClient', {
    apiClientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isapproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true,
    },
    application_applicationid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    secretishashed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  }, {
    tableName: 'apiclients',
    schema: 'dbo',
    freezeTableName: true,
    timestamps: false,
  });

  ApiClient.associate = async (models) => {
    ApiClient.belongsTo(models.application, {
      foreignKey: 'application_applicationid',
    });
  };

  return ApiClient;
};
