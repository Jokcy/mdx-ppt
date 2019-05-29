import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  width: 400px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
  background: red;
  color: #fff;
  border-radius: 5px;
`

export default ({ name }) => {
  function onClick() {
    alert('hello, ' + name)
  }

  return <Div onClick={onClick}>Hello {name}, click me</Div>
}
