import React, { useState } from 'react'
import { ContextMenuProvider } from 'components/ContextMenu/ContextMenuContext'
import ContextMenuPortal from 'components/ContextMenu/ContextMenuPortal'

function getDistanceFromTopWithScroll(e) {
  return e.clientY + window.pageYOffset
}

function getDistanceFromLeftWithScroll(e) {
  return e.clientX + window.pageXOffset
}

const initialState = {
  menuType: 'floating',
  options: [],
  isShowing: false,
  position: { x: 0, y: 0 },
  style: {}
}

/**
 * HOC that holds the state to provide child components with ContextMenu functionality.
 *
 *
 * @param {Array} children
 */
export default function WithContextMenu({ children }) {
  const [contextMenuState, setContextMenu] = useState(initialState)

  /**
   *
   * @param {String} menuType
   * @param {Array<Object>} options
   * @param {Boolean} isShowing
   * @param {Object<x: Number, y:Number>} position
   * @param {Object} style
   */
  function showContextMenu({
    menuType = 'floating',
    options,
    isShowing = true,
    position,
    style = {},
  }) {
    return e => {
      e.preventDefault()
      let newPosition;
      if (menuType === 'floating') {
        newPosition = {
          x: getDistanceFromLeftWithScroll(e),
          y: getDistanceFromTopWithScroll(e)
        }
      } else if (menuType === 'fixed') {
        if (nodeToPositionBeneath) {
          const [x, y] = getBottomLeftXY(nodeToPositionBeneath)
          newPosition = {
            x,
            y
          }
        } else {
          // We use .currentTarget not .target so that only the target with the event handler is used for positioning, even if other-elements receive the onContextMenu event
          const [x, y] = getBottomLeftXY(e.currentTarget)
          newPosition = {
            x,
            y
          }
        }
      } else {
        newPosition = position
      }
      setContextMenu({
        menuType,
        options,
        isShowing,
        position: newPosition,
        style
      })
    }
  }

  function closeContextMenu() {
    setContextMenu({
      menuType: 'floating',
      options: [],
      isShowing: false,
      position: { x: 0, y: 0 },
      style: {}
    })
  }

  return (
    <React.Fragment>
      <ContextMenuProvider value={showContextMenu}>
        {children}
        <ContextMenuPortal
          onClose={closeContextMenu}
          {...contextMenuState}
        />
      </ContextMenuProvider>
    </React.Fragment>
  )
}
