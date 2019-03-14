// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportAdminUser from '../../../app/controller/admin/user';
import ExportApiBlog from '../../../app/controller/api/blog';
import ExportApiCategory from '../../../app/controller/api/category';
import ExportApiTag from '../../../app/controller/api/tag';
import ExportApiUser from '../../../app/controller/api/user';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    admin: {
      user: ExportAdminUser;
    }
    api: {
      blog: ExportApiBlog;
      category: ExportApiCategory;
      tag: ExportApiTag;
      user: ExportApiUser;
    }
  }
}
