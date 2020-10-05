const { DataTypes, Model } = require('sequelize');
// const fs = require('fs');

class Folder extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      key: DataTypes.STRING,
      url: DataTypes.STRING,
    }, { sequelize });
  }

  static associate(models) {
    this.belongsToMany(models.User, { through: ' user_folders', foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Folder;
