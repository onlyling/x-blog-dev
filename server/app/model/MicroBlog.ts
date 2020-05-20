import { Application } from 'egg';
import { Model, BuildOptions } from 'sequelize';

/** 实例声明 */
interface MicroBlogModelIntstance extends Model {
  readonly id: number;
  user_id: string;
  content: string;
  view_count: number;
  image: string;
}

type MicroBlogModelIntstanceStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MicroBlogModelIntstance;
};

export default function (app: Application) {
  const { STRING, INTEGER } = app.Sequelize;

  /**
   * 动态、微博表
   */
  const MicroBlog = app.model.define(
    'MicroBlog',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      /** 用户 id 关联数据 */
      user_id: {
        type: INTEGER,
        allowNull: false,
      },

      /** content */
      content: {
        type: STRING(1000),
        allowNull: false,
      },

      /** 查看次数 */
      view_count: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      /** 图片 */
      image: {
        type: STRING(10000),
        allowNull: false,
      },
    },
    {
      tableName: 'micro_blog',
    },
  ) as MicroBlogModelIntstanceStatic;

  return MicroBlog;

  // return class extends MicroBlog {
  //   static associate() {
  //     // app.model.User.hasMany(app.model.Post, { as: 'posts' });
  //   }
  // } as MicroBlogModelIntstanceStatic;
}
