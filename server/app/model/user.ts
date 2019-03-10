import { Application } from 'egg';

module.exports = (app: Application) => {
  const { STRING, INTEGER } = app.Sequelize;
  /**
   * 用户表
   */
  const Instance = app.model.define('user', {
    // ID
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // 用户名
    user_name: {
      type: STRING,
      allowNull: false,
      validate: {}
    },
    // 密码
    password: {
      type: STRING,
      allowNull: false,
      validate: {}
    },
    // 是否是超级管理员 1 不是， 2 是；
    super_admin: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });

  // 关联关系
  Instance.associate = () => {
    app.model.User.hasMany(app.model.Blog);
  };

  return Instance;
};
