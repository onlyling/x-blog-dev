import { Application } from 'egg';
import { Model, BuildOptions } from 'sequelize';

/** 实例声明 */
interface TagModelIntstance extends Model {
  readonly id: number;
  name: string;
}

type TagModelIntstanceStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TagModelIntstance;
};

export default function (app: Application) {
  const { STRING, INTEGER } = app.Sequelize;

  /**
   * 用户表
   */
  const Tag = app.model.define(
    'Tag',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      /** 标签名称 */
      name: {
        type: STRING(30),
        allowNull: false,
      },
    },
    {
      tableName: 'tag',
      timestamps: false,
    },
  ) as TagModelIntstanceStatic;

  return Tag;

  // return class extends Tag {
  //   static associate() {
  //     // app.model.Tag.hasMany(app.model.Post, { as: 'posts' });
  //   }
  // };
}
