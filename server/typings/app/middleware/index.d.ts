// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminRequired from '../../../app/middleware/adminRequired';
import ExportFormatParams from '../../../app/middleware/formatParams';
import ExportUserRequired from '../../../app/middleware/userRequired';

declare module 'egg' {
  interface IMiddleware {
    adminRequired: typeof ExportAdminRequired;
    formatParams: typeof ExportFormatParams;
    userRequired: typeof ExportUserRequired;
  }
}
