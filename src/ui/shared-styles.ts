import { css } from 'styled-components'

import { palette } from './constants'

interface IProps {
  isInvalid?: boolean
}

export const fieldBorder = css<IProps>`
  border: 2px solid ${({ isInvalid }) => (isInvalid ? palette.danger : palette.gray)};
`
