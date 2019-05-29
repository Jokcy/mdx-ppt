import React, { useEffect, useRef } from 'react'

import { withRouter, Switch, Route, Redirect } from 'react-router-dom'

import styled from 'styled-components'

import { useTransition, animated } from 'react-spring'

// 删除 material 的使用
// import Button from '@material-ui/core/Button'

import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'

import { useTransitions } from '../core/contexts'

const Root = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
`

const Actions = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
  display: flex;
`

const AnimatedDiv = styled(animated.div)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
`

const ActionButton = styled.a`
  display: flex;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background: rgba(200, 200, 200, 0.3);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }

  & + & {
    margin-left: 20px;
  }
`

function Wrapper({ children, history, match, location }) {
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

  useEffect(() => {
    const listener = e => {
      const code = e.keyCode
      if (code === 37 || code === 38) {
        back()
      }
      if (code === 39 || code === 40) {
        next()
      }
    }

    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [next, back])

  return (
    <Root className="markdown-body">
      {transitions.map(({ item: { location }, props, key }) => {
        console.log('item is', children, location)
        return (
          <AnimatedDiv key={key} style={props}>
            <Switch location={location}>
              {children.map(child => {
                return (
                  <Route
                    path={`/${child.props.index}`}
                    key={child.props.index}
                    render={() => {
                      console.log('render', location.pathname)
                      return child
                    }}
                  />
                )
              })}
            </Switch>
          </AnimatedDiv>
        )
      })}
      <Actions>
        {index > 1 ? (
          <ActionButton onClick={back}>
            <ChevronLeft style={{ fontSize: 32 }} />
          </ActionButton>
        ) : null}
        {index < children.length ? (
          <ActionButton onClick={next}>
            <ChevronRight style={{ fontSize: 32 }} />
          </ActionButton>
        ) : null}
      </Actions>
    </Root>
  )
}

export default withRouter(Wrapper)
