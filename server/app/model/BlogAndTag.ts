import { Application } from 'egg';

import * as sequelize from 'sequelize';

interface TypeModelAttributes {
  blog_id: number;
  tag_id: number;
}

type TypeModelInstance = sequelize.Instance<TypeModelAttributes> & TypeModelAttributes;

type TypeModeleModel = sequelize.Model<TypeModelInstance, TypeModelAttributes>;

const initModel = (app: Application): TypeModeleModel => {
  const { INTEGER } = app.Sequelize;
  const attributes: SequelizeAttributes<TypeModelAttributes> = {
    // 日记 ID
    blog_id: {
      type: INTEGER,
      allowNull: false,
      validate: {}
    },
    // 标签 ID
    tag_id: {
      type: INTEGER,
      allowNull: false,
      validate: {}
    }
  };
  /**
   * 日记和标签关联表
   */
  const Instance = app.model.define<TypeModelInstance, TypeModelAttributes>('blog_and_tag', attributes);

  // 关联关系
  Instance.associate = () => {
    app.model.BlogAndTag.belongsTo(app.model.Tag, {
      as: 'tag',
      foreignKey: 'tag_id',
      constraints: false
    });
  };

  return Instance;
};

export default initModel;
