import 'egg';
import { TypeUserModelAttributes } from '../app/model/User';

declare module 'egg' {
  interface Context {
    session: {
      UserInfo: TypeUserModelAttributes;
    };
  }
}
