'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Task.init({
      title: {
          type: DataTypes.STRING,
          allowNull: false
      },
      userId : {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
      },
      isComplete: {
          type: DataTypes.BOOLEAN,
          allowNull: false
      }
  }, {
    sequelize,
    tableName: 'tasks',
    modelName: 'Task',
  });
  return Task;
};
