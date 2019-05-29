const { createBaseFn } = require('./util')

const { item_props } = require('../item-props')

const md = `
===a=6, c=d
# This is title
=== x = y
这是一段话
`

const TYPE = 'ItemProps'

describe('item props parser test', () => {
  let fn

  beforeEach(() => {
    fn = createBaseFn().use(item_props)
  })

  test('should work', () => {
    let ast = fn.parse(md)
    // ast = fn.runSync(ast)

    expect(ast.children.length).toBe(4)

    const child1 = ast.children[0]

    expect(child1.type).toBe(TYPE)
    expect(child1.data.hProperties.a).toBe(6)
    expect(child1.data.hProperties.c).toBe('d')

    const child2 = ast.children[1]

    expect(child2.type).toBe('heading')
    expect(child2.depth).toBe(1)

    const child3 = ast.children[2]

    expect(child3.type).toBe(TYPE)
    expect(child3.data.hProperties.x).toBe('y')
  })
})

describe('item props transformer test', () => {
  let fn

  beforeEach(() => {
    fn = createBaseFn().use(item_props)
  })

  test('should work', () => {
    let ast = fn.parse(md)
    ast = fn.runSync(ast)

    // console.log(ast)

    expect(ast.children.length).toBe(2)

    const child1 = ast.children[0]

    expect(child1.type).toBe('heading')
    expect(child1.data.hProperties.a).toBe(6)
    expect(child1.data.hProperties.c).toBe('d')

    const child2 = ast.children[1]

    expect(child2.type).toBe('paragraph')
    expect(child2.data.hProperties.x).toBe('y')
  })
})
