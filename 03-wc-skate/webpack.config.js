const { resolve, join } = require('path')
const { readFileSync } = require('fs')

const pathIsInside = require('path-is-inside')
const findRoot = require('find-root')

const PROPKEY_ESNEXT = 'esnext'
const dir_ts = resolve(__dirname, '.')
const dir_node_modules = resolve(__dirname, 'node_modules')

module.exports = () => {
  return {
    entry: './main.ts',
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      // Help webpack find `PROPKEY_ESNEXT` source code
      mainFields: [PROPKEY_ESNEXT, 'browser', 'module', 'main'],
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
          include: filepath => {
            return (
              pathIsInside(filepath, dir_ts) || (pathIsInside(filepath, dir_node_modules) && hasPkgEsnext(filepath))
            )
          },
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

/**
 * Find package.json for file at `filepath`.
 * Return `true` if it has a property whose key is `PROPKEY_ESNEXT`.
 */
function hasPkgEsnext(filepath) {
  const pkgRoot = findRoot(filepath)
  const packageJsonPath = resolve(pkgRoot, 'package.json')
  const packageJsonText = readFileSync(packageJsonPath, { encoding: 'utf-8' })
  const packageJson = JSON.parse(packageJsonText)
  return {}.hasOwnProperty.call(packageJson, PROPKEY_ESNEXT) // (A)
}
