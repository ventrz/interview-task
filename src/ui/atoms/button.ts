import styled from 'styled-components'
import { ifProp } from 'styled-tools'

import { indents, palette } from '../constants'

interface IProps {
  primary?: boolean
}

export const Button = styled.button<IProps>`
  background: ${ifProp('primary', palette.blue, palette.veryLightGray)};
  color: ${ifProp('primary', palette.white, palette.darkGray)};
  padding: ${indents.XS} ${indents.S};
  border: none;
  border-radius: 2px;
  transition: background ease-in 0.1s;

  :hover:not(:disabled) {
    cursor: pointer;
    background: ${ifProp('primary', palette.lightBlue, palette.lightGray)};
  }

  &:disabled {
    opacity: 0.3;
  }
`
