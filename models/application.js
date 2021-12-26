module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('application', {
    applicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    applicationName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vendor_vendorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    claimSetName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    odsInstance_odsInstanceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    operationalContextUri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'applications',
    schema: 'dbo',
    freezeTableName: true,
    timestamps: false,
  });

  Application.associate = async (models) => {
    Application.hasMany(models.applicationEducationOrganizations, {
      foreignKey: 'application_applicationid',
      as: 'applicationEducationOrganizations',
    });

    Application.belongsToMany(models.profile, {
      through: 'profileApplications',
      foreignKey: 'application_applicationid',
      as: 'profiles',
    });
  };

  return Application;
};
