import React from 'react'
import styled from 'styled-components'
import noop from 'lodash/noop'
import FlexboxRow from 'containers/base/tables/elements/FlexboxRow'

const StyledContextMenuItem = styled(FlexboxRow)`
  width          : 100%;
  height         : 35px;
  align-items    : center;
  background     : #ffffff;
  cursor         : pointer;
  font-size      : 13px;
  line-height    : 16px;
  color          : #333333;
  :hover {
    background   : #F2F2F2;
    span {
      opacity: 1;
    }
  }
`

const ContextMenuLabel = styled.span`
  margin-left: 9px;
  opacity: 0.8;
`

const ContextMenuIcon = styled.span`
  height: 15px;
  width: 15px;
  margin-left: 15px;
  opacity: 0.5;
`

// TODO: MAKE CONTEXTMENU ICON A SPAN USING RAW SVGS INSTEAD OF IMG TAG

export default function ContextMenuItem({
  icon,
  label,
  closeMenu,
  onClick = noop,
}) {
  function handleClick(e) {
    onClick(e)
    closeMenu(e)
  }
  return (
    <StyledContextMenuItem onClick={handleClick}>
      {icon && <ContextMenuIcon>{icon}</ContextMenuIcon>} <ContextMenuLabel>{label}</ContextMenuLabel>
    </StyledContextMenuItem>
  )
}
