import { Context } from 'egg';

// interface TypeRequest extends Request {
//   query: PlainObject<any>;
// }

export default () => {
  return async (ctx: Context, next: any): Promise<void> => {
    const query = ctx.query;

    // 部分参数格式化
    if (query.curpage) {
      query.curpage = +query.curpage;
    }
    if (query.pagesize) {
      query.pagesize = +query.pagesize;
    }

    // const request = ctx.request as TypeRequest;
    // const { query } = request;

    console.log(ctx.request.query);
    console.log(ctx.query);

    await next();
  };
};
