module.exports = (sequelize, DataTypes) => {
  const ApiClientApplicationEducationOrganizations = sequelize.define('apiClientApplicationEducationOrganizations', {
    apiclient_apiclientid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    applicationedorg_applicationedorgid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
  }, {
    tableName: 'apiclientapplicationeducationorganizations',
    schema: 'dbo',
    freezeTableName: true,
    timestamps: false,
  });

  return ApiClientApplicationEducationOrganizations;
};
