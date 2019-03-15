// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFormatParams from '../../../app/middleware/formatParams';

declare module 'egg' {
  interface IMiddleware {
    formatParams: typeof ExportFormatParams;
  }
}
