import { Box } from 'grid-styled'
import * as React from 'react'
import { Portal } from 'react-portal'
import styled from 'styled-components'

import { fnType, noop } from '../../utils'
import { BlackoutLayer } from '../atoms'
import { indents } from '../constants'

const ModalContent = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

interface IProps {
  isOpened?: boolean
  onOutsideClick: fnType
}

export class Modal extends React.Component<IProps> {
  static defaultProps = {
    onOutsideClick: noop,
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleOutsideClick)
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleOutsideClick)
  }

  handleOutsideClick = e => {
    if (this.props.isOpened && !e.target.closest('.modal-content')) {
      this.props.onOutsideClick!()
    }
  }

  render() {
    const { children, isOpened } = this.props

    return (
      isOpened && (
        <Portal>
          <React.Fragment>
            <BlackoutLayer />
            {/* TODO: get rid of className selector */}
            <Box is={ModalContent} p={indents.M} className="modal-content">
              {children}
            </Box>
          </React.Fragment>
        </Portal>
      )
    )
  }
}
