import React from 'react'

import styled from 'styled-components'

import wrapper from './wrapper'
// import wrapper from './new-wrapper'
import Page from './Page'
import CodeBlock from './CodeBlock'

/**
 * 配置基础组件
 */

const commonStyle = `
  line-height: 1.25;
  margin-bottom: 16px;
  margin-top: 24px;
`

/**
 * use for
 * - blockquote
 * - dl
 * - ol
 * - p
 * - pre
 * - table
 */
const paragraphCommonStyle = `
  margin-bottom: 16px;
  margin-top: 0;
`

// headerings
const h1 = styled.h1`
  ${commonStyle}
  font-size: 3rem;
  font-weight: 300;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3rem;
`
const h2 = styled.h2`
  ${commonStyle}
  font-size: 2.5rem;
  font-weight: 300;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
`
const h3 = styled.h3`
  ${commonStyle}
  font-size: 2rem;
  font-weight: 300;
`
const h4 = styled.h4`
  ${commonStyle}
  font-size: 1.5rem;
  font-weight: 300;
`
const h5 = styled.h5`
  ${commonStyle}
  font-size: 1rem;
  font-weight: 600;
`
const h6 = styled.h6`
  ${commonStyle}
  font-size: 0.75rem;
  font-weight: 600;
`
// headering

// paragraph
const p = styled.p`
  margin-bottom: 10px;
  margin-top: 0;
  ${paragraphCommonStyle}
  & code {
    background: #eee;
    border-radius: 0.25rem;
    padding: 0 10px;
    margin: 0 5px;
  }
`
const blockquote = styled.blockquote`
  border-left: 0.25em solid #dfe2e5;
  color: #6a737d;
  padding: 0 1em;
  margin: 0;
  ${paragraphCommonStyle}
  & > :first-child {
    margin-top: 0;
  }
  & > :last-child {
    margin-bottom: 0;
  }
`
// paragraph

// list
const olUlCommon = `
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 0;
`
const ol = styled.ol`
  ${olUlCommon}
  ${paragraphCommonStyle}
  padding-left: 2rem;
`
const ul = styled.ul`
  ${olUlCommon}
  ${paragraphCommonStyle}
  padding-left: 2rem;
  & ol {
    list-style-type: lower-roman;
  }
  & ul {
    list-style-type: lower-roman;
  }
`
const li = styled.li`
  word-wrap: break-all;
  & > p {
    margin-top: 16px;
  }
  & + li {
    margin-top: 0.25rem;
  }
`
// list

// inline
const a = styled.a`
  background-color: transparent;
  color: #0366d6;
  text-decoration: none;
`
const strong = styled.strong`
  font-weight: inherit;
  font-weight: bolder;
  font-weight: 900;
  display: inline-block;
  padding: 0 5px;
`
const em = styled.em`
  font-weight: inherit;
  font-weight: lighter;
  font-weight: 100;
  display: inline-block;
  padding: 0 5px;
`
const del = styled.del`
  font-weight: inherit;
  font-weight: lighter;
  font-weight: 100;
  display: inline-block;
  padding: 0 5px;
`
// inline

// img
const img = styled.img`
  background-color: #fff;
  box-sizing: content-box;
  max-width: 100%;
  border-style: none;
  &[align='right'] {
    padding-left: 20px;
  }
  &[align='left'] {
    padding-right: 20px;
  }
`
// img

// table
const table = styled.table`
  ${paragraphCommonStyle}
  border-collapse: collapse;
  border-spacing: 0;
  overflow: auto;
  width: 100%;
  & th {
    font-weight: 600;
  }
  & td,
  & th {
    border: 1px solid #dfe2e5;
    padding: 6px 13px;
    text-align: center;
  }
  & tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
  }
  & tr:nth-child(2n) {
    background-color: #f6f8fa;
  }
`

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,

  p,
  blockquote,

  ol,
  ul,
  li,

  a,
  strong,
  em,
  del,

  img,

  table,

  // wrapper 最好不要替换
  // 可以实现一个 `withWrapper` 来抽离必要逻辑
  // 包括：
  //  - 路由
  //  - 过度
  wrapper,
  Page,
  pre: props => <div {...props} />,
  code: CodeBlock,
}
