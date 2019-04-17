// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBlog from '../../../app/model/Blog';
import ExportBlogAndTag from '../../../app/model/BlogAndTag';
import ExportCategory from '../../../app/model/Category';
import ExportComment from '../../../app/model/Comment';
import ExportTag from '../../../app/model/Tag';
import ExportUser from '../../../app/model/User';

declare module 'sequelize' {
  interface Sequelize {
    Blog: ReturnType<typeof ExportBlog>;
    BlogAndTag: ReturnType<typeof ExportBlogAndTag>;
    Category: ReturnType<typeof ExportCategory>;
    Comment: ReturnType<typeof ExportComment>;
    Tag: ReturnType<typeof ExportTag>;
    User: ReturnType<typeof ExportUser>;
  }
}
