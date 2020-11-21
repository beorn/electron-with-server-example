const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  entry: {
    index: './src/main/main.ts',
    server: './src/server/server.ts'
  },
  output: { filename: '[name].js' },

  module: { rules: require('./webpack.rules'), },

  plugins: [new ForkTsCheckerWebpackPlugin({ async: false })],

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    plugins: [new TsconfigPathsPlugin()]
  },
}