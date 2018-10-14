import { FieldProps } from 'formik'
import * as React from 'react'

import { DummySelect } from '../atoms'

interface IOption {
  value: string
  label: string
}

export interface IProps {
  id?: string
  className?: string
  onValuesUpdate?: (formValues: any, updateFn: any) => void
  options: IOption[]
}

export class Select extends React.Component<IProps & FieldProps> {
  setValue = value => {
    const {
      form: { setFieldValue },
      field: { name },
    } = this.props

    setFieldValue(name, value)
  }

  componentDidUpdate(prevProps) {
    const {
      onValuesUpdate,
      form: { values },
    } = this.props

    // tslint:disable-next-line no-unused-expression
    onValuesUpdate && onValuesUpdate(values, this.setValue)
  }

  render() {
    const { field, form, options, onValuesUpdate, ...rest } = this.props

    return (
      <DummySelect {...field} {...rest}>
        {options.map(({ value = '', label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </DummySelect>
    )
  }
}
