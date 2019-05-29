const mdxAstToMdxHast = require('@mdx-js/mdx/mdx-ast-to-mdx-hast')

const { rebuildTree } = require('../page')

const { rawCompiler, createFn } = require('./util')

const md = `
+++
title: 'page1'
+++
# page1
+++
title: 'page2'
+++
# page2
`

describe('test mdxast page', function() {
  let fn

  beforeEach(() => {
    fn = createFn()
  })

  test('work', () => {
    const ast = fn.parse(md)
    const tree = fn.runSync(ast)

    const page1 = tree.children[0]

    expect(page1.type).toBe('Page')
    expect(page1.data.hName).toBe('Page')
    expect(page1.data.hProperties.title).toBe('page1')

    const page2 = tree.children[2]

    expect(page2.type).toBe('Page')
    expect(page2.data.hName).toBe('Page')
    expect(page2.data.hProperties.title).toBe('page2')

    expect(tree.children.length).toBe(4)
  })
})

describe('test mdxhast page', function() {
  let fn

  beforeEach(() => {
    fn = createFn()
      .use(mdxAstToMdxHast)
      .use(rawCompiler)
      .use(rebuildTree)
  })

  test('work', () => {
    const ast = fn.parse(md)
    const tree = fn.runSync(ast)

    expect(tree.children.length).toBe(2)

    const page1 = tree.children[0]

    expect(page1.type).toBe('element')
    expect(page1.properties.title).toBe('page1')
    expect(page1.properties.index).toBe(1)

    const page2 = tree.children[1]

    expect(page2.type).toBe('element')
    expect(page2.properties.title).toBe('page2')
    expect(page2.properties.index).toBe(2)
  })
})
