import MaskedInput from 'react-input-mask'
import styled from 'styled-components'

import { indents } from '../constants'
import { fieldBorder } from '../shared-styles'

interface IProps {
  isInvalid?: boolean
  maxLength?: number
}

export const DummyInput = styled.input<IProps>`
  padding: ${indents.XS};
  font-size: 1.4rem;
  display: block;
  ${fieldBorder};
`

export const DummyMaskedInput = DummyInput.withComponent(MaskedInput)
