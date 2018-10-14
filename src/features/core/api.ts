import { defaultTo, find, findIndex, identical, pipe, propEq, reject, update } from 'ramda'

export interface IUser {
  id: number
  fullName: string
  birthDate: string
  address?: string
  city?: string
  phoneNumber?: string
}

const STORAGE_KEY = 'users'
const setUserList = (v: IUser[]) => localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
const getUserList = (): IUser[] => JSON.parse(defaultTo('[]', localStorage.getItem(STORAGE_KEY)))

const getAll = () => Promise.resolve(getUserList())

const get = (id: number) => Promise.resolve(find<IUser>(propEq('id', id), getUserList()))

const post = (user: IUser) => {
  setUserList([...getUserList(), { ...user, id: new Date().getTime() }])
  return Promise.resolve(user)
}

const put = (id: number, user: IUser) => {
  const users = getUserList()
  const index = findIndex(propEq('id', id), users)

  if (index !== -1) {
    pipe(
      update(index, user),
      setUserList,
    )(users)
  }

  return Promise.resolve(user)
}

const remove = id => {
  const users = getUserList()
  const entityToDelete = find(propEq('id', id), users)

  pipe(
    reject(identical(entityToDelete)),
    setUserList,
  )(users)

  return Promise.resolve(entityToDelete)
}

export const api = { getAll, get, post, put, remove }
