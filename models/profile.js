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

  Profile.associate = async (model) => {
    Profile.belongsToMany(model.application, {
      through: 'profileApplications',
      foreignKey: 'profile_profileid',
      as: 'applications',
    });
  };

  return Profile;
};
