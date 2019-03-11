import { Application } from 'egg';

module.exports = (app: Application) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  /**
   * 日志表
   */
  const Instance = app.model.define('blog', {
    // ID
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // 标题
    title: {
      type: STRING,
      allowNull: false,
      validate: {}
    },
    // 内容
    content: {
      type: TEXT,
      allowNull: true,
      validate: {}
    },
    // markdown 内容
    markdown_content: {
      type: TEXT,
      allowNull: true,
      validate: {}
    },
    // 自定义url 暂时放弃实现
    diy_url: {
      type: STRING,
      allowNull: true,
      validate: {}
    }
  });

  // 关联关系
  Instance.associate = () => {
    app.model.Blog.belongsTo(app.model.Category, {
      as: 'blog_category'
    });
    app.model.Blog.belongsTo(app.model.User, {
      as: 'user'
    });
    app.model.Blog.belongsToMany(app.model.Tag, {
      through: 'blog_tag'
    });
  };

  return Instance;
};
