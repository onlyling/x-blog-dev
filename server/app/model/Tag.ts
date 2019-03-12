import { Application } from 'egg';

import * as sequelize from 'sequelize';

interface TypeModelAttributes {
  id?: number;
  name: string;
}

type TypeModelInstance = sequelize.Instance<TypeModelAttributes> & TypeModelAttributes;

type TypeModeleModel = sequelize.Model<TypeModelInstance, TypeModelAttributes>;

const initModel = (app: Application): TypeModeleModel => {
  const { STRING, INTEGER } = app.Sequelize;
  const attributes: SequelizeAttributes<TypeModelAttributes> = {
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
  const Instance = app.model.define<TypeModelInstance, TypeModelAttributes>('tag', attributes);

  // 关联关系
  Instance.associate = () => {
    app.model.Tag.belongsToMany(app.model.Blog, {
      through: {
        model: app.model.BlogAndTag,
        unique: false
      },
      foreignKey: 'tag_id',
      constraints: false
    });
  };

  return Instance;
};

export default initModel;
