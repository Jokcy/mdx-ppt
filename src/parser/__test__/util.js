const visit = require('unist-util-visit')

const unified = require('unified')
const toMDAST = require('remark-parse')
const remarkMdx = require('remark-mdx')
const squeeze = require('remark-squeeze-paragraphs')
const toMDXAST = require('@mdx-js/mdx/md-ast-to-mdx-ast')
const remarkFrontmatter = require('remark-frontmatter')
const remarkYaml = require('remark-parse-yaml')

const { page } = require('../page')

const DEFAULT_OPTIONS = {
  footnotes: true,
  remarkPlugins: [],
  rehypePlugins: [],
  compilers: [],
}

exports.rawCompiler = () => ast => {
  visit(ast, 'raw', node => {
    const { children, tagName, properties } = raw(node)
    node.type = 'element'
    node.children = children
    node.tagName = tagName

    node.properties = properties
  })
}

exports.createFn = function createFn() {
  return unified()
    .use(toMDAST, DEFAULT_OPTIONS)
    .use(remarkMdx, DEFAULT_OPTIONS)
    .use(squeeze, DEFAULT_OPTIONS)
    .use(toMDXAST, DEFAULT_OPTIONS)
    .use(remarkFrontmatter, { type: 'yaml', marker: '+', anywhere: true })
    .use(remarkYaml)
    .use(page)
}

exports.createBaseFn = function createBaseFn() {
  return unified()
    .use(toMDAST, DEFAULT_OPTIONS)
    .use(remarkMdx, DEFAULT_OPTIONS)
    .use(squeeze, DEFAULT_OPTIONS)
    .use(toMDXAST, DEFAULT_OPTIONS)
}
