import { addIndex, always, map } from 'ramda'

export const noop = always(undefined)

export const removeTrailingSlash = (v: string) => v.replace(/\/+$/, '')

export const createArray = (length: number) => Array.from(Array(length))

export const getDateString = (year: string | number, month: string | number, day: string | number) =>
  new Date(+year, +month, +day).toISOString()

export const parseDate = (date: string) => new Date(date).toLocaleDateString()

export const mapWithIndex = addIndex(map)
