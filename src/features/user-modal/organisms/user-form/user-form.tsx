import { Formik } from 'formik'
import { Box, Flex } from 'grid-styled'
import { contains, isEmpty, omit, pipe, prop } from 'ramda'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import * as Yup from 'yup'

import { Button, Fields, indents, Label } from '../../../../ui'
import { fnType, getDateString, Omit } from '../../../../utils'
import { api, IUser } from '../../../core'
import { getDays, initialDate, MONTHS, splitDate, YEARS } from './helpers'

const FULLNAME_MAX_CHARS = 100

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .max(FULLNAME_MAX_CHARS, `Максимальная длина поля - ${FULLNAME_MAX_CHARS} символов`)
    .required('Поле обязательно для заполнения'),
  phoneNumber: Yup.string().matches(
    // third regex's part is a hacky way to overcome masked-input + yup + formik compatibility issues
    /(^$)|(\+7 \(\d{3}\) \d{3}-\d{2}-\d{2})|(\+7 \(___\) ___-__-__)/,
    'Неверный формат номера телефона',
  ),
})

interface IProps {
  onCancel: fnType
  onSave: (user: IUser) => void
}

interface IMatchParams {
  id?: string
}

interface ISplittedDate {
  day: string
  month: string
  year: string
}

type IFormValues = Omit<IUser, 'birthDate'> & ISplittedDate

type IPossibleState = IFormValues | {}

const processDataToFormValues = (data: Partial<IUser>) => {
  const { birthDate } = data
  const splittedDate = birthDate ? splitDate(birthDate) : initialDate

  return { ...omit(['birthDate'], data), ...splittedDate }
}

const processFormValuesToData = (values: IFormValues) => {
  const { year, month, day } = values

  return {
    ...omit(['day', 'month', 'year'], values),
    birthDate: getDateString(year, month, day),
  }
}

export class UserForm extends React.Component<IProps & RouteComponentProps<IMatchParams>, IPossibleState> {
  state: IPossibleState = processDataToFormValues({})

  handleValuesUpdate = ({ month, year, day }, update) => {
    const upcomingDays = getDays(month, year).map(prop('value'))

    if (!contains(day, upcomingDays)) {
      update(initialDate.day)
    }
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props

    if (id) {
      api.get(+id).then(user => user && this.setState(processDataToFormValues(user)))
    }
  }

  handleSubmit = (values: IFormValues) => this.props.onSave(processFormValuesToData(values))

  render() {
    const { onCancel } = this.props

    return (
      !isEmpty(this.state) && (
        <Formik<IFormValues>
          initialValues={this.state as IFormValues}
          onSubmit={this.handleSubmit}
          enableReinitialize
          validateOnChange={false}
          validationSchema={validationSchema}
          render={({ values: { month, year }, isValid, handleSubmit }) => {
            const upcomingDaysOptions = getDays(month, year)

            return (
              <form onSubmit={handleSubmit}>
                <Box
                  is={Fields.TextInput}
                  name="fullName"
                  label="ФИО"
                  id="fullName"
                  maxLength={FULLNAME_MAX_CHARS}
                  mb={indents.L}
                />
                <Box mb={indents.L}>
                  <Box is={Label} mb={indents.XS}>
                    Дата рождения
                  </Box>
                  <Fields.Select options={upcomingDaysOptions} onValuesUpdate={this.handleValuesUpdate} name="day" />
                  <Fields.Select options={MONTHS} name="month" />
                  <Fields.Select options={YEARS} name="year" />
                </Box>
                <Box is={Fields.TextInput} name="address" label="Адрес" id="address" mb={indents.L} />
                <Box is={Fields.TextInput} name="city" label="Город" id="city" mb={indents.L} />
                <Box
                  is={Fields.MaskedInput}
                  name="phoneNumber"
                  label="Телефон"
                  id="phoneNumber"
                  mask="+7 (999) 999-99-99"
                  maskChar="_"
                  mb={indents.L}
                />
                <Flex justifyContent="flex-end">
                  <Box is={Button} mr={indents.S} type="button" onClick={onCancel}>
                    Отмена
                  </Box>
                  <Button disabled={!isValid} type="submit" primary>
                    Сохранить
                  </Button>
                </Flex>
              </form>
            )
          }}
        />
      )
    )
  }
}
