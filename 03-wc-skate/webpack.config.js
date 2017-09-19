const { resolve, join } = require('path')

module.exports = () => {
  return {
    entry: './main.ts',
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    devtool: 'source-map',
    devServer: {
      stats: 'minimal',
      publicPath: '/dist/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: /src/,
          use: [
            {
              loader: 'awesome-typescript-loader',
            },
          ],
        },
      ],
    },
  }
}
