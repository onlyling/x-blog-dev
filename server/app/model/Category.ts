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
   * 类目表
   */
  const Instance = app.model.define<TypeModelInstance, TypeModelAttributes>('category', attributes);

  // 关联关系
  Instance.associate = () => {
    app.model.Category.hasMany(app.model.Blog);
  };

  return Instance;
};

export default initModel;
