import styled from 'styled-components'

import { indents } from '../constants'
import { fieldBorder } from '../shared-styles'

export const DummySelect = styled.select`
  ${fieldBorder};
  padding: ${indents.XS};
`
