const visit = require('unist-util-visit')

exports.page = function page() {
  // 该组件基于 remark-metadata
  // const parser = this.Parser
  // const compiler = this.Compiler

  // if (parser && parser.prototype && parser.prototype.blockTokenizers) {
  //   attachParser(parser)
  // }

  // 直接在metadata基础上进行处理
  return function(tree) {
    visit(tree, 'yaml', node => {
      node.type = 'Page'
      node.data = {
        hName: 'Page',
        hProperties: node.data.parsedValue,
      }
    })
  }
}

function isPage(child) {
  return child && child.tagName === 'Page'
}

exports.rebuildTree = function() {
  // console.log(tree.children, file)
  return function rebuild(tree, file) {
    const pages = []
    let index = 1
    const isFirstChildPage = isPage(tree.children[0])
    /**
     * 记录是否刚刚开始，因为第一个节点如果是Page，在循环中会被再次判断
     */
    let start = isFirstChildPage ? true : false
    let page = isFirstChildPage
      ? tree.children[0]
      : {
          tagName: 'Page',
          properties: {},
          type: 'element',
          children: [],
        }
    page.properties.index = index

    for (let child of tree.children) {
      if (child.tagName !== 'Page') {
        if (child.type === 'import') {
          pages.push(child)
        } else {
          page.children.push(child)
        }
      } else {
        if (start) {
          start = false
          continue
        }
        pages.push(page)
        page = child
        page.properties.index = ++index
        index
      }
    }
    if (page.children.length > 0) pages.push(page)
    tree.children = pages
  }
}
