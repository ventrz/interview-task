import { Box } from 'grid-styled'
import { createBrowserHistory } from 'history'
import * as React from 'react'
import { Router } from 'react-router-dom'
import { injectGlobal } from 'styled-components'

import { StorageProvider } from './features/core'
import { UserList } from './features/user-list'
import { UserModal } from './features/user-modal'
import { Button, indents } from './ui'

const history = createBrowserHistory()

// tslint:disable-next-line no-unused-expression
injectGlobal`
  html {
    font-size: .625em; /* 10px */
    font-family: system-ui, sans-serif;
  }

  button, input {
    font-family: system-ui, sans-serif;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #root {
    height: 100%;
  }
`

export const App = () => (
  <Router history={history}>
    <StorageProvider>
      <UserModal>
        {({ showCreateModal, showEditModal }) => (
          <Box p={indents.S}>
            <Box is={Button} onClick={showCreateModal} primary mb={indents.S}>
              Добавить
            </Box>
            <UserList onUserEdit={showEditModal} />
          </Box>
        )}
      </UserModal>
    </StorageProvider>
  </Router>
)
