import { Application } from 'egg';
import { Model, BuildOptions } from 'sequelize';

/** 实例声明 */
interface UserModelIntstance extends Model {
  readonly id: number;
  user_id: string;
  content: string;
  view_count: number;
  image: string;
}

type UserModelIntstanceStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModelIntstance;
};

export default function (app: Application) {
  const { STRING, INTEGER } = app.Sequelize;

  /**
   * 用户表
   */
  const User = app.model.define(
    'User',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      /** 用户名 */
      user_name: {
        type: STRING(30),
        allowNull: false,
      },

      /** 密码 */
      password: {
        type: STRING(255),
        allowNull: false,
      },

      /** 性别 */
      sex: {
        type: STRING,
        allowNull: false,
        validate: {
          // '0': 保密；'1': 男；'2': 女;
          isIn: [['0', '1', '2']],
        },
        defaultValue: '0',
      },
    },
    {
      tableName: 'user',
    },
  ) as UserModelIntstanceStatic;

  return User;

  // return class extends User {
  //   static associate() {
  //     // app.model.User.hasMany(app.model.Post, { as: 'posts' });
  //   }
  // };
}
