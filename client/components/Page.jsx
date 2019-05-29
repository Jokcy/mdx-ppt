import React from 'react'

import styled from 'styled-components'

import PropTypes from 'prop-types'

const MAX_WIDTH = 1024

const Root = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
`

const Inner = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  padding: 40px 0;
`

export default function Page(props) {
  const contents = (
    <Root>
      <Inner>{props.children}</Inner>
    </Root>
  )

  // console.log('show', props)

  // return <Route path={`/${props.index}`} render={() => contents} />
  return contents

  // return <TransitionRoute path={`/${props.index}`}>{contents}</TransitionRoute>
}

Page.propTypes = {
  /**
   * 配置当前页面的主题
   * 需要考虑如何传递给`styled-components`
   */
  theme: PropTypes.string,
}
