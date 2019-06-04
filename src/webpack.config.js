const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const debug = require('debug')('mp:webpack')

const remarkFrontmatter = require('remark-frontmatter')
const remarkYaml = require('remark-parse-yaml')

// 设置为可配置项目
const externalLink = require('remark-external-links')

const CircularDependencyPlugin = require('circular-dependency-plugin')

const {page, rebuildTree, item_props} = require('./parser')

module.exports = createConfig

const defaultEntry = path.resolve(__dirname, '../example/hello.jsx')
const defaultClient = path.resolve(__dirname, '../example/client.js')

// when direct `webpack-dev-server --config`
const defaultOptions = {
  customWebpack: c => c,
  entry: defaultEntry,
  remarkPlugins: [],
  rehypePlugins: [],
  inject: defaultClient,
}

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/env', '@babel/react'],
  },
}

function createConfig(isDev, options = defaultOptions) {
  debug('createing webpack config')
  const customWebpack = options.webpack || (c => c)

  const {inject, entry, remarkPlugins, rehypePlugins} = options

  const config = {
    devtool: isDev ? 'cheap-eval-source-map' : 'source-map',
    mode: isDev ? 'development' : 'production',
    entry: path.resolve(__dirname, './entry.js'),
    output: {
      publicPath: isDev ? '/public/' : '/',
      filename: '[hash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: babelLoader,
          exclude: [path.resolve(__dirname, 'lib')],
        },
        {
          test: /\.mdx?$/,
          use: [
            babelLoader,
            {
              loader: '@mdx-js/loader',
              options: {
                remarkPlugins: [
                  externalLink,
                  [
                    remarkFrontmatter,
                    {type: 'yaml', marker: '+', anywhere: true},
                  ],
                  remarkYaml,
                  page,
                  item_props,
                ].concat(remarkPlugins),
                rehypePlugins: [rebuildTree].concat(rehypePlugins),
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        config: inject || defaultClient,
        target: entry || defaultEntry,
      },
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, '../src/template.html'),
      }),
      new CircularDependencyPlugin(),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(process.env.ENV || ''),
      }),
    ],
  }

  return customWebpack(config)
}
