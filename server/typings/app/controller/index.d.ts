// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportApiTag from '../../../app/controller/api/tag';
import ExportApiUser from '../../../app/controller/api/user';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    api: {
      tag: ExportApiTag;
      user: ExportApiUser;
    }
  }
}
