const { DataTypes, Model } = require('sequelize');
const fs = require('fs');
const { resolve } = require('path');
const { promisify } = require('util');

class File extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      key: DataTypes.STRING,
      mimetype: DataTypes.STRING,
      url: DataTypes.STRING,
    }, { sequelize });

    this.addHook('beforeDestroy', async (file) => {
      await promisify(fs.unlink)(
        resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', file.key)
      );
    });
  }

  static associate(models) {
    this.belongsToMany(models.User, { foreignKey: 'user_id', as: 'user', through: 'user_files' });
    this.belongsToMany(models.Folder, { foreignKey: 'folder_id', as: 'folder', through: 'folder_files' });
  }
}

module.exports = File;
