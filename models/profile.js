module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    profilename: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'profiles',
    schema: 'dbo',
    freezeTableName: true,
    timestamps: false,
  });

  Profile.associate = async (models) => {
    // Profile.hasMany(models.profileApplications, {
    //   foreignKey: 'profile_profileid',
    //   as: 'profileApplications',
    // });
    Profile.belongsToMany(models.application, {
      through: 'profileApplications',
      foreignKey: 'profile_profileid',
      as: 'applications',
    });
  };

  return Profile;
};
