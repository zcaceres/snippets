import React from 'react'
import noop from 'lodash/noop'

const ContextMenuContext = React.createContext({
  showContextMenu: noop
})

export const ContextMenuProvider = ContextMenuContext.Provider

export default ContextMenuContext
