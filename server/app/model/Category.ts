import { Application } from 'egg';

module.exports = (app: Application) => {
  const { STRING, INTEGER } = app.Sequelize;
  /**
   * 类目表
   */
  const Instance = app.model.define('category', {
    // ID
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // 名称
    name: {
      type: STRING,
      allowNull: false,
      validate: {}
    }
  });

  // 关联关系
  Instance.associate = () => {
    app.model.Category.hasMany(app.model.Blog);
  };

  return Instance;
};
