const yaml = require('js-yaml')

exports.item_props = function item_props() {
  const parser = this.Parser

  if (parser && parser.prototype && parser.prototype.blockTokenizers) {
    attachParser(parser)
  }

  return function transform(tree) {
    const newChildren = []
    tree.children.forEach((child, index) => {
      if (child.type === 'ItemProps') {
        const nextChild = tree.children[index + 1]
        nextChild.data = nextChild.data || {}
        nextChild.data.hProperties = nextChild.data.hProperties || {}
        nextChild.data.hProperties = {
          ...nextChild.data.hProperties,
          ...child.data.hProperties,
        }
        // 更新position
        nextChild.position.start = child.position.start
      } else {
        newChildren.push(child)
      }
    })
    tree.children = newChildren
  }
}

function attachParser(parser) {
  const { blockMethods, blockTokenizers } = parser.prototype

  blockMethods.splice(blockMethods.indexOf('paragraph'), 0, 'itemprops')

  blockTokenizers.itemprops = transformProps
}

const item_props_reg = /^===(.*)\n/
const prop_reg = /^([a-zA-Z]|_|\$).*=(.*)$/

function transformProps(eat, value, slient) {
  if (!value.trim().startsWith('===')) {
    return
  }

  const match = item_props_reg.exec(value)
  if (!match || match.index !== 0 || slient) {
    return
  }

  const body = match[0]
  const propsStr = match[1].trim()

  const propsArr = propsStr.split(',')

  const props = {}

  propsArr.forEach(prop => {
    const trimed = prop.trim()
    if (!trimed) {
      return
    }
    const pairMatch = prop_reg.exec(trimed)

    if (!pairMatch) {
      console.error(
        `props should be written within key=value, seems ${prop} is not valid`,
      )
      return
    }

    const key = pairMatch[1]
    const value = pairMatch[2]

    if (key) {
      props[key] = yaml.safeLoad(value, 'utf8')
    }
  })

  eat(body)({
    type: 'ItemProps',
    data: {
      hName: 'ItemProps',
      hProperties: props,
    },
  })
}
