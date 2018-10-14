import { FastField, Field, FieldProps } from 'formik'
import * as React from 'react'

import { InputWithLabel, IProps as IInputProps, MaskedInputWithLabel } from './input-wth-label'
import { IProps as ISelectProps, Select as RawSelect } from './select'

interface IFieldConfig {
  name: string
}

const createField = <EP extends {}, IP extends FieldProps = FieldProps>(
  component: React.ComponentType<IP>,
  fast = true,
): React.SFC<EP & IFieldConfig> => {
  const FieldComponent = fast ? FastField : Field
  return props => <FieldComponent {...props} component={component} />
}

const TextInput = createField<IInputProps>(InputWithLabel)
const MaskedInput = createField<IInputProps>(MaskedInputWithLabel)
const Select = createField<ISelectProps>(RawSelect, false)

export const Fields = { TextInput, Select, MaskedInput }
