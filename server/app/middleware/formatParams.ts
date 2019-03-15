import { Context, Request, PlainObject } from 'egg';

interface TypeRequest extends Request {
  query: PlainObject<any>;
}

export default () => {
  return async (ctx: Context, next: any): Promise<void> => {
    const request = ctx.request as TypeRequest;
    const { query } = request;

    // 部分参数格式化
    if (query.curpage) {
      query.curpage = +query.curpage;
    }
    if (query.pagesize) {
      query.pagesize = +query.pagesize;
    }

    console.log(ctx.request.query);
    console.log(ctx.query);

    await next();
  };
};
