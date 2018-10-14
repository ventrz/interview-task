import { getDaysInMonth } from 'date-fns'
import { pipe } from 'ramda'

import { createArray, mapWithIndex } from '../../../../utils'

export const MONTHS = [
  {
    label: 'Январь',
    value: '0',
  },
  {
    label: 'Февраль',
    value: '1',
  },
  {
    label: 'Март',
    value: '2',
  },
  {
    label: 'Апрель',
    value: '3',
  },
  {
    label: 'Май',
    value: '4',
  },
  {
    label: 'Июнь',
    value: '5',
  },
  {
    label: 'Июль',
    value: '6',
  },
  {
    label: 'Август',
    value: '7',
  },
  {
    label: 'Сентябрь',
    value: '8',
  },
  {
    label: 'Октябрь',
    value: '9',
  },
  {
    label: 'Ноябрь',
    value: '10',
  },
  {
    label: 'Декабрь',
    value: '11',
  },
]

const currentYear = new Date().getFullYear()
export const YEARS = createArray(100).map((_, i) => {
  const year = (currentYear - i).toString()
  return {
    label: year,
    value: year,
  }
})

interface IOption {
  value: string
  label: string
}

export const getDays = (month: number | string, year: number | string) =>
  pipe(
    getDaysInMonth,
    createArray,
    mapWithIndex((_, i) => {
      const actualDay = (++i).toString()
      return { value: actualDay, label: actualDay }
    }),
  )(new Date(+year, +month)) as IOption[]

export const splitDate = (date: string) => {
  const resDate = new Date(date)
  return {
    day: resDate.getDate().toString(),
    month: resDate.getMonth().toString(),
    year: resDate.getFullYear().toString(),
  }
}

export const initialDate = {
  day: '1',
  month: '0',
  year: YEARS[0].value.toString(),
}
