import React from 'react'
import Linkify from 'react-linkify'

/**
 * Linkify component with secure defaults.
 */
export default ({ children }) => (
  <Linkify
    properties={{
      target: '_blank',
      rel: 'noopener noreferrer'
    }}
  >
    {children}
  </Linkify>
)

