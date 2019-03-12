import { Application } from 'egg';

import * as sequelize from 'sequelize';

interface TypeModelAttributes {
  blog_id?: number;
  markdown_content: string;
  content?: string;
  state: string;
  post_user_id: number;
  receive_user_id: number;
  parent_id?: number;
  receive_id: number;
}

type TypeModelInstance = sequelize.Instance<TypeModelAttributes> & TypeModelAttributes;

type TypeModeleModel = sequelize.Model<TypeModelInstance, TypeModelAttributes>;

const initModel = (app: Application): TypeModeleModel => {
  const { INTEGER, TEXT } = app.Sequelize;
  const attributes: SequelizeAttributes<TypeModelAttributes> = {
    // 日记ID
    blog_id: {
      type: INTEGER,
      allowNull: false
    },
    // 内容
    markdown_content: {
      type: TEXT,
      allowNull: false,
      validate: {}
    },
    // 内容
    content: {
      type: TEXT,
      allowNull: false,
      validate: {}
    },
    // 状态 1 未读，2 已读
    state: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    // 发布者ID
    post_user_id: {
      type: INTEGER,
      allowNull: false
    },
    // 接受者ID
    receive_user_id: {
      type: INTEGER,
      allowNull: false
    },
    // 评论的父级ID
    parent_id: {
      type: INTEGER,
      allowNull: false
    },
    // 回复评论的ID
    receive_id: {
      type: INTEGER,
      allowNull: false
    }
  };

  /**
   * 评论表
   */
  const Instance = app.model.define<TypeModelInstance, TypeModelAttributes>('comment', attributes);

  // 关联关系
  Instance.associate = () => {
  };

  return Instance;
};

export default initModel;
