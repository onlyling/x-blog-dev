// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBlog from '../../../app/service/Blog';
import ExportCategory from '../../../app/service/Category';
import ExportTag from '../../../app/service/Tag';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    blog: ExportBlog;
    category: ExportCategory;
    tag: ExportTag;
    test: ExportTest;
    user: ExportUser;
  }
}
