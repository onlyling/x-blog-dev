import { Application } from 'egg';

import * as sequelize from 'sequelize';

interface TypeModelAttributes {
  id?: number;
  user_name: string;
  password: string;
  super_admin?: number;
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
  };

  /**
   * 用户表
   */
  const Instance = app.model.define<TypeModelInstance, TypeModelAttributes>('user', attributes);

  // 关联关系
  Instance.associate = () => {
    // app.model.User.hasMany(app.model.Blog);
  };

  return Instance;
};

export default initModel;
