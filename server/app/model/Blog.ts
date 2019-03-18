import { Application } from 'egg';

import * as sequelize from 'sequelize';

interface TypeModelAttributes {
  id?: number;
  title: string;
  content?: string;
  markdown_content: string;
  diy_url?: string;
  user_id?: number;
  category_id?: number;
  visit_count?: number;
}

interface TypeModelFixMethod {
  setCategory: (params: number) => any;
  setTag: (params: number) => any;
  setTags: (params: number[]) => any;
  setUser: (params: number) => any;
}

type TypeModelInstance = sequelize.Instance<TypeModelAttributes> & TypeModelAttributes & TypeModelFixMethod;

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
    },
    visit_count: {
      type: STRING,
      allowNull: true,
      validate: {},
      defaultValue: 0
    }
  };
  /**
   * 日记表
   */
  const Instance = app.model.define<TypeModelInstance, TypeModelAttributes>('blog', attributes);

  // 关联关系
  Instance.associate = () => {
    app.model.Blog.belongsTo(app.model.Category, {
      as: 'category',
      foreignKey: 'category_id'
    });
    app.model.Blog.belongsTo(app.model.User, {
      as: 'user',
      foreignKey: 'user_id'
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
