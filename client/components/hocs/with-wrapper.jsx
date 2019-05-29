import React from 'react'

import { useTransitions } from '../core/Provider'

export default function withWrapper(Wrapper) {
  return function WrappedWrapper({ children, history, match, location }) {
    const totalPages = children.length

    const index = parseInt(match.params.index)

    const lastRouterRef = useRef({
      history,
      match,
      location,
    })

    const { transition, transitions: definedTransitions } = useTransitions()

    const definedTransition = definedTransitions[transition]

    const transitions = useTransition(
      { match, location },
      ({ location }) => location.pathname,
      typeof definedTransition === 'function'
        ? definedTransition(lastRouterRef.current, { history, match, location })
        : definedTransition,
    )

    lastRouterRef.current = {
      history,
      match,
      location,
    }

    function next() {
      if (index < children.length) history.push(`/${index + 1}`)
    }

    function back() {
      // history.goBack()
      if (index > 1) history.push(`/${index - 1}`)
    }

    return <Wrapper />
  }
}
