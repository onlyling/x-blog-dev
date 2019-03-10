// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBlog from '../../../app/model/blog';
import ExportCategory from '../../../app/model/category';
import ExportComment from '../../../app/model/comment';
import ExportTag from '../../../app/model/tag';
import ExportUser from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    Blog: ReturnType<typeof ExportBlog>;
    Category: ReturnType<typeof ExportCategory>;
    Comment: ReturnType<typeof ExportComment>;
    Tag: ReturnType<typeof ExportTag>;
    User: ReturnType<typeof ExportUser>;
  }
}
