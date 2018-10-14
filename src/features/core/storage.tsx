import * as React from 'react'

import { api, IUser } from './api'

interface IState {
  userList: IUser[]
}

const { Consumer: StorageConsumer, Provider } = React.createContext({
  // this could be useful only when Consumer will be used outside of Provider
  createUser: (user: IUser) => Promise.resolve(),
  deleteUser: (id: number) => Promise.resolve(),
  updateUser: (id: number, user: IUser) => Promise.resolve(),
  userList: [] as IUser[],
})

class StorageProvider extends React.Component<{}, IState> {
  state: IState = {
    userList: [],
  }

  componentDidMount() {
    this.fetchUserList()
  }

  setUsers = (userList: IUser[]) => this.setState({ userList })

  fetchUserList = () => api.getAll().then(this.setUsers)

  createUser = (user: IUser) => api.post(user).then(this.fetchUserList)

  updateUser = (id: number, user: IUser) => api.put(user.id, user).then(this.fetchUserList)

  deleteUser = (id: number) => api.remove(id).then(this.fetchUserList)

  render() {
    return (
      <Provider
        value={{
          createUser: this.createUser,
          deleteUser: this.deleteUser,
          updateUser: this.updateUser,
          userList: this.state.userList,
        }}>
        {this.props.children}
      </Provider>
    )
  }
}

export { StorageProvider, StorageConsumer }
