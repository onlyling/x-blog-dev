import { Application } from 'egg';

import * as sequelize from 'sequelize';

interface TypeTagAttributes {
  id?: number;
  name: string;
}

type TypeTagInstance = sequelize.Instance<TypeTagAttributes> & TypeTagAttributes;

type TypeTageModel = sequelize.Model<TypeTagInstance, TypeTagAttributes>;

const initModel = (app: Application): TypeTageModel => {
  const { STRING, INTEGER } = app.Sequelize;
  const attributes: SequelizeAttributes<TypeTagAttributes> = {
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
  };
  /**
   * 标签表
   */
  const Instance = app.model.define<TypeTagInstance, TypeTagAttributes>('tag', attributes);

  // 关联关系
  Instance.associate = () => {
    app.model.Tag.belongsToMany(app.model.Blog, {
      through: 'blog_tag'
    });
  };

  return Instance;
};

export default initModel;
