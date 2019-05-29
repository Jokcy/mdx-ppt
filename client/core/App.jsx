import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import styled, {createGlobalStyle} from 'styled-components'

// import { useTheme } from '../core/Provider'

// import 'github-markdown-css'
// 全局样式，设置html的字体大小
const GlobalStyle = createGlobalStyle`
html, body, #app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
html {
  font-size: ${({theme}) => theme.default.baseFs}px;
}
`

export default function App({children}) {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route path="/:index" render={() => children} />
        <Route render={() => <Redirect to="/1" repleac={true} />} />
      </Switch>
    </>
  )
}
