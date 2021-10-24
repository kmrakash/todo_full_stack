'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Task, {
          foreignKey:"userId"
      })
    }

    toJSON() {
        return { ...this.get(), id: undefined }
    }
  };
  User.init({
    username: {
          type: DataTypes.STRING,
          allowNull : false
    },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};
