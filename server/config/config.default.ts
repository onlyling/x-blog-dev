import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1589209631587_7631';

  // add your egg config in here
  config.middleware = [];

  // jwt
  // 参数参考：https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
  config.jwt = {
    secret: '1234567890', // secretOrPublicKey
    verify: {
      maxAge: '2d', // 最大有效时间
    },
  };

  // add your special config in here
  const bizConfig = {
    // sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
