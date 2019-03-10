import { Application } from 'egg';

module.exports = (app: Application) => {
  const { STRING, INTEGER } = app.Sequelize;
  /**
   * 评论表
   */
  const Instance = app.model.define('comment', {
    // ID
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // 日记ID
    blog_id: {
      type: INTEGER,
      allowNull: false
    },
    // 内容
    content: {
      type: STRING,
      allowNull: false,
      validate: {}
    },
    // 状态 1 未读，2 已读
    state: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    // 发布者ID
    post_user_id: {
      type: INTEGER,
      allowNull: false
    },
    // 接受者ID
    receive_user_id: {
      type: INTEGER,
      allowNull: false
    },
    // 评论的父级ID
    parent_id: {
      type: INTEGER,
      allowNull: false
    },
    // 回复评论的ID
    receive_id: {
      type: INTEGER,
      allowNull: false
    }
  });

  return Instance;
};
