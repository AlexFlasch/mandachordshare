const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  webpack(config, options) {
    // Do not run type checking twice:
    if (options.isServer) {
    }

    config.node = {
      fs: 'empty'
    };

    config.module.rules.push({
      test: /\.svg$/,
      exclude: /node_modules/,
      loader: 'svg-react-loader'
    });

    config.module.rules.push({
      test: /\.mp3$/,
      exclude: /node_modules/,
      loader: 'file-loader'
    });

    // config.module.rules.push({
    //   test: /\.(ts|tsx)$/,
    //   exclude: /node_modules/,
    //   loader: 'ts-loader'
    // });

    return config;
  }
};
