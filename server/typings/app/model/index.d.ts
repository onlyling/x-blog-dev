// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBlog from '../../../app/model/Blog';
import ExportCategory from '../../../app/model/Category';
import ExportComment from '../../../app/model/Comment';
import ExportTag from '../../../app/model/Tag';
import ExportUser from '../../../app/model/User';

declare module 'sequelize' {
  interface Sequelize {
    Blog: ReturnType<typeof ExportBlog>;
    Category: ReturnType<typeof ExportCategory>;
    Comment: ReturnType<typeof ExportComment>;
    Tag: ReturnType<typeof ExportTag>;
    User: ReturnType<typeof ExportUser>;
  }
}
