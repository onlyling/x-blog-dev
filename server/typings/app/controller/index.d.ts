// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportAppMicroBlog from '../../../app/controller/app/micro_blog';
import ExportAppUser from '../../../app/controller/app/user';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    app: {
      microBlog: ExportAppMicroBlog;
      user: ExportAppUser;
    }
  }
}
