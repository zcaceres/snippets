import React, { useState } from 'react'
import { ContextMenuProvider } from 'components/ContextMenu/ContextMenuContext'
import ContextMenuPortal from 'components/ContextMenu/ContextMenuPortal'

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
      const newPosition = menuType === 'floating' ?
        { x: e.clientX, y: e.clientY } :
        position

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
