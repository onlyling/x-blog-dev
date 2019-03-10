// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportApiUser from '../../../app/controller/api/user';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    api: {
      user: ExportApiUser;
    }
  }
}
