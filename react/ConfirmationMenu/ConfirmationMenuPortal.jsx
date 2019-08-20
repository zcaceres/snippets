import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import FlexboxRow from 'containers/base/tables/elements/FlexboxRow'
import { closeConfirmationMenu } from 'components/ConfirmationMenu/withConfirmationMenu'
import ClickBound from 'elements/ClickBound'

import { useWindowSizeToRestrictElementPosition } from 'feUtils'

const CONFIRMATION_BOX_WIDTH_PX = 210
const CONFIRMATION_BOX_HEIGHT_PX = 141

const StyledButton = styled.button`
  min-width    : 70px;
  padding      : 2px 10px;
  height       : 35px;
  cursor       : pointer;
  font-weight  : 500;
  font-size    : 14px;
  line-height  : 18px;
  box-sizing   : border-box;
  box-shadow   : 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`

const Title = styled.div`
  font-size  : 14px;
  font-weight: bold;
  line-height: 18px;
  color      : #2E373E;
  margin-bottom: 8px;
`

const Subtitle = styled.div`
  font-size    : 13px;
  line-height  : 16px;
  color        : #2E373E;
  opacity      : 0.5;
  margin-bottom: 15px;
`

const ConfirmButton = styled(StyledButton)`
  color     : #fff;
  border    : 1px solid #ff5252;
  background: #ff5252;
  transition: background-color 100ms;
  :hover {
    background: #f73030;
    border    : 1px solid #f73030;
  }
`

const CancelButton = styled(StyledButton)`
  color     : #2E373E;
  opacity   : 0.6;
  transition: opacity 100ms;
  :hover {
    opacity : 1;
  }
`

const ConfirmationMenu = styled(ClickBound)`
  width        : ${CONFIRMATION_BOX_WIDTH_PX}px;
  height       : ${CONFIRMATION_BOX_HEIGHT_PX}px;
  position     : absolute;
  z-index      : 99999999999;
  padding      : 15px;
  background   : #FFFFFF;
  border       : 1px solid #EEEEEE;
  box-sizing   : border-box;
  box-shadow   : 0px 4px 10px rgba(58, 58, 58, 0.15);
  border-radius: 4px;
  top          : ${props => props.top}px;
  left         : ${props => props.left}px;
`

const portalNode = document.getElementById('confirmation-menu-root')

function ConfirmationMenuPortal({
  menuType,
  title,
  subtitle,
  confirmLabel,
  confirmAction,
  isShowing,
  position,
  style
}) {
  if (!isShowing) return null

  function onConfirm(e) {
    confirmAction(e)
    closeConfirmationMenu()
  }

  const [leftPositioning, topPositioning] = useWindowSizeToRestrictElementPosition(position, CONFIRMATION_BOX_WIDTH_PX, CONFIRMATION_BOX_HEIGHT_PX)

  return ReactDOM.createPortal(
    <ConfirmationMenu
      id='confirmation-menu'
      isShowing={isShowing}
      left={leftPositioning}
      top={topPositioning}
      menuType={menuType}
      style={style}
      onClickOutside={closeConfirmationMenu}
    >
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <FlexboxRow style={{ justifyContent: 'space-between' }}>
        <CancelButton onClick={closeConfirmationMenu}>
          Cancel
        </CancelButton>
        <ConfirmButton onClick={onConfirm}>
          {confirmLabel}
        </ConfirmButton>
      </FlexboxRow>
    </ConfirmationMenu>
    , portalNode)
}

export default connect(
  state => ({
    ...state.ui.confirmationMenu
  })
)(ConfirmationMenuPortal)
