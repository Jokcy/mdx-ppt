import { createContext, useContext } from 'react'

export const transitionContext = createContext({})

export function useTransitions() {
  return useContext(transitionContext)
}
