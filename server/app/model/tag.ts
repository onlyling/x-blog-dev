import { Application } from 'egg';

module.exports = (app: Application) => {
  const { STRING, INTEGER } = app.Sequelize;
  /**
   * 标签表
   */
  const Instance = app.model.define('tag', {
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
    app.model.Tag.belongsToMany(app.model.Blog, {
      through: 'blog_tag'
    });
  };

  return Instance;
};
