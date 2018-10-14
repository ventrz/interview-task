import { Box, Flex } from 'grid-styled'
import * as React from 'react'

import { indents } from '../../ui'
import { StorageConsumer } from '../core'
import { UserCard } from './organisms'

interface IProps {
  onUserEdit?: (id: number) => void
}

export const UserList: React.SFC<IProps> = ({ onUserEdit }) => (
  <Flex flexWrap="wrap">
    <StorageConsumer>
      {({ userList, deleteUser }) =>
        userList.map(v => (
          <Box
            is={UserCard}
            mr={indents.M}
            mb={indents.M}
            key={v.id}
            user={v}
            onEdit={onUserEdit}
            onDelete={deleteUser}
          />
        ))
      }
    </StorageConsumer>
  </Flex>
)
