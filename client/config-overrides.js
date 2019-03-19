const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addWebpackAlias,
  fixBabelImports,
  addLessLoader
} = require('customize-cra');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const addDiyPlugins = (config) => {
  config.optimization.splitChunks = {
    cacheGroups: {
      commons: {
        name: 'commons',
        chunks: 'initial',
        minChunks: 2,
        maxInitialRequests: 5,
        minSize: 0
      },
      vendor: {
        test: /node_modules/,
        chunks: 'initial',
        name: 'vendor',
        priority: 10,
        enforce: true
      },
      baseLib: {
        test: /node_modules\/(immutable|\@rematch|axios)/,
        chunks: 'initial',
        name: 'base-lib',
        priority: 15,
        enforce: true
      },
      reactLib: {
        test: /node_modules\/(react|redux)/,
        chunks: 'initial',
        name: 'react-lib',
        priority: 20,
        enforce: true
      }
    }
  };
  // config.plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/));
  // config.plugins.push(new BundleAnalyzerPlugin());
  return config;
};

module.exports = override(
  addDiyPlugins,
  addDecoratorsLegacy(),
  disableEsLint(),
  addWebpackAlias({}),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {},
    localIdentName: '[local]-[hash:base64:5]'
  })
);
