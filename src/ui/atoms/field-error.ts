import styled from 'styled-components'

import { indents, palette } from '../constants'

export const FieldError = styled.div`
  position: absolute;
  top: 100%;
  background: ${palette.danger};
  color: white;
  font-size: 1rem;
  padding: 0 ${indents.XS};
`
