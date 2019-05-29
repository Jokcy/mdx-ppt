import styled from 'styled-components'

import { components } from '../client/index.jsx'

// console.log(components)

const p = styled(components.p)`
  color: red;
`

export default {
  // 用来指定 `transition`
  transition: 'fade',
  components: {
    p,
  },
  // depend on `react-spring` useTransition
  transitions: {},
  // styled-components theme
  theme: {},
}
