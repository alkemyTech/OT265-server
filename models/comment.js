'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.News, { foreignKey: 'news_id' });
      Comment.belongsTo(models.User, { foreignKey: 'user_id', as: 'comments' });
    }
  };
  Comment.init({
    body: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    news_id: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comment',
    paranoid: true
  });
  return Comment;
};