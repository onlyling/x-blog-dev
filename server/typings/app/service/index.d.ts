// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBlog from '../../../app/service/blog';
import ExportCategory from '../../../app/service/category';
import ExportTag from '../../../app/service/tag';
import ExportTest from '../../../app/service/test';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    blog: ExportBlog;
    category: ExportCategory;
    tag: ExportTag;
    test: ExportTest;
    user: ExportUser;
  }
}
