module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define('vendor', {
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    vendorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'vendors',
    schema: 'dbo',
    freezeTableName: true,
    timestamps: false,
  });

  Vendor.associate = async (models) => {
    Vendor.hasMany(models.vendorNamespacePrefixes, {
      foreignKey: 'vendor_vendorid',
      as: 'vendorNamespacePrefixes',
    });
  };

  return Vendor;
};
