// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMicroBlog from '../../../app/model/MicroBlog';
import ExportUser from '../../../app/model/User';

declare module 'egg' {
  interface IModel {
    MicroBlog: ReturnType<typeof ExportMicroBlog>;
    User: ReturnType<typeof ExportUser>;
  }
}
