// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportMicroBlog from '../../../app/service/micro_blog';
import ExportTag from '../../../app/service/tag';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    microBlog: AutoInstanceType<typeof ExportMicroBlog>;
    tag: AutoInstanceType<typeof ExportTag>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
