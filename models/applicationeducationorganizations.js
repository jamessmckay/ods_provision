module.exports = (sequelize, DataTypes) => {
  const ApplicationEducationOrganizations = sequelize.define('applicationEducationOrganizations', {
    applicationEducationOrganizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    educationOrganizationId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    application_applicationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'applicationeducationorganizations',
    schema: 'dbo',
    freezeTableName: true,
    timestamps: false,
  });

  return ApplicationEducationOrganizations;
};
