module.exports = (sequelize, DataTypes) => {
  const ProfileApplications = sequelize.define('profileApplications', {
    profile_profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    application_applicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    tableName: 'profileapplications',
    schema: 'dbo',
    freezeTableName: true,
    timestamps: false,
  });

  return ProfileApplications;
};
