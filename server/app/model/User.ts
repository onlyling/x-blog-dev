import { Application } from 'egg';
import * as sequelize from 'sequelize';

export interface TypeUserModelAttributes {
  id?: number;
  user_name: string;
  password?: string;
  super_admin?: number;
  describe?: string;
  email?: string;
  company?: string;
  personal_web?: string;
  title?: string;
  tag?: string;
  location?: string;
}

type TypeModelInstance = sequelize.Instance<TypeUserModelAttributes> & TypeUserModelAttributes;

type TypeModeleModel = sequelize.Model<TypeModelInstance, TypeUserModelAttributes>;

const initModel = (app: Application): TypeModeleModel => {
  const { STRING, INTEGER } = app.Sequelize;
  const attributes: SequelizeAttributes<TypeUserModelAttributes> = {
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
      defaultValue: 1,
      get(this: TypeModelInstance) {
        return this.getDataValue('super_admin') === 2;
      }
    },
    // 自定义描述
    describe: {
      type: STRING,
      allowNull: true,
      validate: {}
    },
    // 邮箱
    email: {
      type: STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    // 公司
    company: {
      type: STRING,
      allowNull: true,
      validate: {}
    },
    // 个人站点
    personal_web: {
      type: STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    // 职位
    title: {
      type: STRING,
      allowNull: true,
      validate: {}
    },
    // 标签
    tag: {
      type: STRING,
      allowNull: true,
      validate: {}
    },
    // 地址
    location: {
      type: STRING,
      allowNull: true,
      validate: {}
    }
  };

  /**
   * 用户表
   */
  const Instance = app.model.define<TypeModelInstance, TypeUserModelAttributes>('user', attributes);

  // 关联关系
  Instance.associate = () => {
    // app.model.User.hasMany(app.model.Blog);
  };

  return Instance;
};

export default initModel;
