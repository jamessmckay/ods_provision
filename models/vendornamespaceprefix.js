module.exports = (sequelize, DataTypes) => {
  const VendorNamespacePrefixes = sequelize.define('vendorNamespacePrefixes', {
    vendorNamespacePrefixId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    namespaceprefix: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendor_vendorid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'vendor_vendorid',
    },
  }, {
    tableName: 'vendornamespaceprefixes',
    schema: 'dbo',
    freezeTableName: true,
    timestamps: false,
  });

  VendorNamespacePrefixes.associate = (models) => {
    VendorNamespacePrefixes.belongsTo(models.vendor, {
      foreignKey: 'vendor_vendorid',
      as: 'vendor',
    });
  };

  return VendorNamespacePrefixes;
};
