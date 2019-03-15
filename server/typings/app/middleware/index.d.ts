// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFormatParams from '../../../app/middleware/formatParams';
import ExportUserRequired from '../../../app/middleware/userRequired';

declare module 'egg' {
  interface IMiddleware {
    formatParams: typeof ExportFormatParams;
    userRequired: typeof ExportUserRequired;
  }
}
