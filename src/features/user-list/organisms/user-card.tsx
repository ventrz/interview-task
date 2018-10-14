import { Box, Flex } from 'grid-styled'
import * as React from 'react'

import { Button, H2, indents, palette, Text } from '../../../ui'
import { noop, parseDate } from '../../../utils'
import { IUser } from '../../core'
import { CardContainer } from '../atoms'

interface IProps {
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  user: IUser
  className?: string
}

export class UserCard extends React.Component<IProps> {
  static defaultProps = {
    onDelete: noop,
    onEdit: noop,
  }

  handleDelete = () => {
    const {
      onDelete,
      user: { id },
    } = this.props

    onDelete!(id)
  }

  handleEdit = () => {
    const {
      onEdit,
      user: { id },
    } = this.props

    onEdit!(id)
  }

  render() {
    const {
      user: { fullName, birthDate, address, city, phoneNumber },
      className,
    } = this.props

    return (
      <Box is={CardContainer} p={indents.S} className={className} width="20rem">
        <Box is={H2} mb={indents.S}>
          {fullName}
        </Box>
        <Box mb={indents.S}>
          <Text>{birthDate && parseDate(birthDate)}</Text>
          <Text>{address}</Text>
          <Text>{city}</Text>
          <Text>{phoneNumber}</Text>
        </Box>
        <Box is={Button} mr={indents.S} onClick={this.handleEdit}>
          Изменить
        </Box>
        <Button onClick={this.handleDelete}>Удалить</Button>
      </Box>
    )
  }
}
