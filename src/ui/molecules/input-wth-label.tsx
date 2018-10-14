import { FieldProps } from 'formik'
import { Box, Flex } from 'grid-styled'
import * as React from 'react'

import { DummyInput, DummyMaskedInput, FieldError, Label, RelativeContainer } from '../atoms'
import { indents } from '../constants'

interface IWrapperProps {
  label?: string
  className?: string
}

interface IInternalInputProps {
  isInvalid?: boolean
}

interface IExternalInputProps {
  id?: string
  maxLength?: number
}

export type IProps = IWrapperProps & IExternalInputProps

const createInput = (
  Component: React.ComponentType<FieldProps['field'] & IInternalInputProps & IExternalInputProps>,
): React.SFC<IProps & FieldProps> => ({
  id,
  label,
  className,
  field: { name },
  field: { value = '', ...fieldRest },
  form: {
    errors: { [name]: actualError },
    touched: { [name]: touched },
  },
  ...rootRest
}) => {
  const error = touched && actualError

  return (
    <Flex is={RelativeContainer} className={className} flexDirection="column">
      <Box is={Label} htmlFor={id} mb={indents.XS}>
        {label}
      </Box>
      <Component value={value} isInvalid={!!error} id={id} {...fieldRest} {...rootRest} />
      {error && <FieldError>{error}</FieldError>}
    </Flex>
  )
}

// bruteforce way to fix formik/SC onChange event's typings compatibility issues
export const InputWithLabel = createInput(DummyInput as any)
export const MaskedInputWithLabel = createInput(DummyMaskedInput as any)
