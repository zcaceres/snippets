import React from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'

import ClickBound from 'elements/ClickBound'
import ContextMenuItem from 'components/ContextMenu/ContextMenuItem'

const ContextMenu = styled(ClickBound)`
  position: absolute;
  z-index: 9999999999;
  width: 168px;
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  box-sizing: border-box;
  box-shadow: 0px 3px 11px rgba(58, 58, 58, 0.14), 0px 2px 12px rgba(0, 0, 0, 0.11);
  border-radius: 4px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;

  :first-child {
    border-radius: 5px 5px 0px 0px;
  }

  :last-child {
    border-radius: 0px 0px 5px 5px;
  }
`

const portalNode = document.getElementById('context-menu-root')

export default function ContextMenuPortal ({
  onClose,
  menuType, // 'floating' or 'fixed'
  options,
  isShowing,
  position,
  style
}) {
  const { x, y } = position
  if (!isShowing) return null

  return ReactDOM.createPortal(
    <ContextMenu
      id='context-menu'
      isShowing={isShowing}
      left={Math.max(x, 1)}
      top={Math.max(y, 1)}
      menuType={menuType}
      style={style}
      onClickOutside={onClose}
    >
      {options && options.map(({ icon, label, action }) => (
        <ContextMenuItem
          icon={icon}
          label={label}
          onClick={action}
          closeMenu={onClose}
        />
      ))}
    </ContextMenu>
  , portalNode)
}
