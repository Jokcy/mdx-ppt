import ReactDOM from 'react-dom'
import React from 'react'
import {HashRouter} from 'react-router-dom'

import Provider from './core/Provider'

import App from './core/App'

// 正式情况改成 'ppt.mdx'
// import Test from './test.mdx'
import MDX from 'target'

ReactDOM.render(
  <Provider>
    {/* <Router> */}
    <HashRouter>
      <App>
        <MDX />
      </App>
    </HashRouter>
    {/* </Router> */}
  </Provider>,
  document.getElementById('app'),
)
