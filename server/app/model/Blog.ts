import { Application } from 'egg';

import * as sequelize from 'sequelize';

interface TypeModelAttributes {
  id?: number;
  title: string;
  content?: string;
  markdown_content: string;
  diy_url?: string;
}

type TypeModelInstance = sequelize.Instance<TypeModelAttributes> & TypeModelAttributes;

type TypeModeleModel = sequelize.Model<TypeModelInstance, TypeModelAttributes>;

const initModel = (app: Application): TypeModeleModel => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const attributes: SequelizeAttributes<TypeModelAttributes> = {
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
  };
  /**
   * 日记表
   */
  const Instance = app.model.define<TypeModelInstance, TypeModelAttributes>('blog', attributes);

  // 关联关系
  Instance.associate = () => {
    app.model.Blog.belongsTo(app.model.Category, {
      as: 'category'
    });
    app.model.Blog.belongsTo(app.model.User, {
      as: 'user'
    });
    app.model.Blog.belongsToMany(app.model.Tag, {
      through: {
        model: app.model.BlogAndTag,
        unique: false
      },
      foreignKey: 'blog_id',
      constraints: false
    });
  };

  return Instance;
};

export default initModel;
