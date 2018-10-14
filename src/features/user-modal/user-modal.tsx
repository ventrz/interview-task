import * as React from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'

import { Modal } from '../../ui'
import { fnType, removeTrailingSlash } from '../../utils'
import { IUser, StorageConsumer } from '../core'
import { UserForm } from './organisms/user-form'

const CREATE = 'create'
const EDIT = 'edit'

const getCreateURL = url => `${removeTrailingSlash(url)}/${CREATE}`
const getEditURL = (url, id) => `${removeTrailingSlash(url)}/${EDIT}/${id}`

interface IModalActions {
  showCreateModal: fnType
  showEditModal: (id: number) => void
}

interface IProps {
  children: (modalActions: IModalActions) => React.ReactNode
}

interface IMatchParams {
  id?: string
}

class DummyUserModal extends React.Component<IProps & RouteComponentProps> {
  showCreateModal = () => {
    const {
      history,
      match: { url },
    } = this.props

    history.push(getCreateURL(url))
  }

  showEditModal = id => {
    const {
      history,
      match: { url },
    } = this.props

    history.push(getEditURL(url, id))
  }

  closeModal = () => {
    const {
      history,
      match: { url },
    } = this.props

    history.push(url)
  }

  render() {
    const {
      match: { url },
      children,
    } = this.props

    return (
      <React.Fragment>
        <StorageConsumer>
          {({ createUser, updateUser }) => {
            const renderModal = (routeProps: RouteComponentProps<IMatchParams>) => {
              const {
                match: {
                  params: { id },
                },
              } = routeProps

              const expectedAction: (user: IUser) => Promise<void> = routeProps.match.params.id
                ? updateUser.bind(null, id)
                : createUser
              const handleSave = (user: IUser) => expectedAction(user).then(this.closeModal)

              return (
                <Modal isOpened onOutsideClick={this.closeModal}>
                  <UserForm onCancel={this.closeModal} onSave={handleSave} {...routeProps} />
                </Modal>
              )
            }

            return (
              <Switch>
                <Route path={`${getCreateURL(url)}`} render={renderModal} />
                <Route path={`${getEditURL(url, ':id')}`} render={renderModal} />
              </Switch>
            )
          }}
        </StorageConsumer>
        {children({ showCreateModal: this.showCreateModal, showEditModal: this.showEditModal })}
      </React.Fragment>
    )
  }
}

export const UserModal = withRouter(DummyUserModal)
