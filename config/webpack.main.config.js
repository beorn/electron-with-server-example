const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  entry: './src/main/main.ts',

  module: { rules: require('./webpack.rules'), },

  plugins: [new ForkTsCheckerWebpackPlugin({ async: false })],

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    plugins: [new TsconfigPathsPlugin()]
  },
}