# MDX-PPT

[演示地址](http://mdxppt.jokcy.me)

通过 `MDX` 语法，让你便捷组织你的内容的同时，可以便捷地展示你的内容。使用 `MDX` 你还可以享受 `React` 非常强大的组件化功能，让你可以任意展示你的创意。

**目前该项目仍然出于非常早期的开发阶段，API 变动会非常频繁，并且可能会有较多的 bug，如果你想要使用稳定功能，可以点击右上角的 `star` 和 `watch release` 来获取最新的发布信息。**

# 语法

本工具基于 `mdx`，所有其语法都支持，在此基础上，增加来以下功能

### PPT

```md
+++
title: Hello
+++

# This is PPT1
```

通过两个`+++`包裹的部分，里面的内容遵从`yaml`的语法，会被解析成 `props` 传递给 `Page` 组件。上一个 `+++` 区域到下一个之间成为一个 `Page`，里面的内容会作为 `Page` 的 `children`。

### item-props

在`mdx`中每一个 `block` 都会以特定组件进行渲染，比如：

```md
这是一段话
```

会渲染成 `<p>这是一段话</p>`，而这个 `p` 组件是可以自定义的，那么当然他也可以接收 `props`。我们可以通过以下方式来进行添加：

```md
===color=red,size=24
这是一段话
```

那么 `p` 组件就会接收到：

```js
{
  color: 'red',
  size: 24
}
```

### 以上只是甜品

Markdown在编译成网页时最大的劣势是局限性较大，毕竟Markdown的最大目的是以内容为中心，减少不必要的排版规则。所以如果单单以 Markdown 作为 PPT 的基础，那么明显功能是非常简陋的。

但是，MDX则完全解决来这个问题，你可以通过自己定义组件来展示任何你想展示的内容，比如：图表

```
+++
+++

<YourChartComponent />
```

一个展示图表的 Page 就完成来，而且，你可以充分享受其可交互性，你的图表可以基于任何前端库，Highcharts、D3等等等等。

# 使用

暂时还不支持全局安装

首先安装

```
npm i mdx-ppt react react-dom

// or

yarn add mdx-ppt react react-dom
```

然后创建你的 mdx 文件

你可以非常方便得通过指定文件来启动开发服务

```
node_modules/.bin/mdx-ppt -e ppt.mdx

// 或者写在 package.josn 的 `scripts` 里面

mdx-ppt -e ppt.mdx
```

或者你可以指定一个配置文件

```
mdx-ppt --c config-file-path
```

使用 `mdx-ppt build` 来创建生产环境的 bundle

### config

```js
module.exports = {
  // 目标 mdx 文件
  entry: 'example/test.mdx',
  // 注入自定义的内容
  inject: 'example/client.js',
  // 开发端口
  devPort: 8888,
  // 这两个是 `mdx` 的配置项，你可以自己扩展编译器的功能
  // 参考：https://mdxjs.com/guides/writing-a-plugin
  remarkPlugins: [],
  rehypePlugins: [],
  // 自定义webpack
  webpack(config) {
    // return new config
  },
}
```

### custom

client.js

```js
export default {
  // 用来指定 `transition`
  // 目前支持 `fade` 和 `slide`
  // 自定义 transition 的功能正在开发中
  transition: 'fade',
  // 自定义编译之后的具体展示组件
  components: {
    p,
  },
  // ... 更多正在开发中
}
```

### 可自定义的组件

可以查看[这里](https://mdxjs.com/getting-started#table-of-components)

内部自定义来大部分组件，采用的样式参考了 `github-markdown-css`，样式使用 `styled-components` 来进行定义，你可以非常方便得在这基础上来扩展组件

```js
// client.js

import { components } from 'mdx-ppt'

import styled from 'styled-components'

const p = styled(components.p)`
  color: red;
`

export default {
  // ...
  components: {
    p,
  },
}
```

这样你可以即享用原来组件的样式，同时又进行自定义。

当然你可以直接覆盖原来的组件。

### 其他组件

##### Page

`Page` 是 `mdx-ppt` 扩展的组件，他代表来**每一页 ppt**，你可以通过对他进行自定义来扩展。

# Roadmap

1. 支持页面的自定义 `transition`
2. 页面的 `theme`
3. tests
4. theme
5. 移除 `material-ui` 的依赖
