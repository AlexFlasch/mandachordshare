module.exports = {
  webpack: (config, options) => {
    // Do not run type checking twice:
    // if (options.isServer) {
    // }

    config.node = {
      fs: 'empty'
    };

    config.module.rules.push({
      test: /\.svg$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'svg-react-loader'
        }
      ]
    });

    config.module.rules.push({
      test: /\.mp3$/i,
      exclude: /node_modules/,
      use: [
        {
          loader: 'file-loader'
        }
      ]
    });

    // config.module.rules.push({
    //   test: /\.(ts|tsx)$/,
    //   exclude: /node_modules/,
    //   loader: 'ts-loader'
    // });

    config.module.rules.push({
      test: /\.worker\.js$/,
      loader: 'worker-loader',
      options: {
        name: 'static/[hash].worker.js',
        publicPath: '/_next/'
      }
    });

    config.output.globalObject = '(typeof self !== "undefined" ? self : this)';

    return config;
  }
};
