import React from 'react'

import { MDXProvider } from '@mdx-js/react'

import { ThemeProvider } from 'styled-components'

import config from 'config'

// default components
import components from '../components/index'
import theme from './theme'

import defaultTransitions from './transitions'

import { transitionContext } from './contexts'

// const transitionContext = createContext({})
// const themeContext = createContext({})

const TransitionProvider = transitionContext.Provider
// const ThemeProvider = themeContext.Provider

let customComponents = config.components || {}
const customTransitions = config.transitions || {}
const transition = config.transition || 'slide'

if (typeof customComponents === 'function') {
  customComponents = customComponents(components)
}

export default function Provider({ children }) {
  return (
    <MDXProvider components={{ ...components, ...customComponents }}>
      <TransitionProvider
        value={{
          transition,
          transitions: { ...defaultTransitions, ...customTransitions },
        }}
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </TransitionProvider>
    </MDXProvider>
  )
}

// export function useTheme() {
//   return useContext(themeContext)
// }

// export function useTransitions() {
//   return useContext(transitionContext)
// }
