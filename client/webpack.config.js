const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: argv.mode || 'development',
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true, // Очищает dist перед сборкой
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@pong/shared': path.resolve(__dirname, '../shared/src/'),
      },
    },
    devtool: isProduction ? false : 'source-map',
    optimization: {
      minimize: isProduction,
      minimizer: [new TerserPlugin()],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 8080,
      hot: true,
      historyApiFallback: true,
    },
  };
};