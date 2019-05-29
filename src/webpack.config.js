const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const remarkFrontmatter = require('remark-frontmatter')
const remarkYaml = require('remark-parse-yaml')

const CircularDependencyPlugin = require('circular-dependency-plugin')

const { page, rebuildTree, item_props } = require('./parser')

// module.exports = config

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

function createConfig(isDev, options = defaultOptions) {
  const customWebpack = options.webpack || (c => c)

  const { inject, entry, remarkPlugins, rehypePlugins } = options

  const config = {
    devtool: isDev ? 'cheap-eval-source-map' : 'source-map',
    mode: isDev ? 'development' : 'production',
    entry: path.resolve(__dirname, '../client/app.jsx'),
    output: {
      publicPath: '/public/',
      filename: '[hash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
        },
        {
          test: /\.mdx?$/,
          use: [
            'babel-loader',
            {
              loader: '@mdx-js/loader',
              options: {
                remarkPlugins: [
                  [
                    remarkFrontmatter,
                    { type: 'yaml', marker: '+', anywhere: true },
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
        template: path.resolve(__dirname, '../client/template.html'),
      }),
      new CircularDependencyPlugin(),
    ],
  }

  return customWebpack(config)
}
