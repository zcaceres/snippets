import { useEffect } from 'react'

/**
 * Fire function `handler` when Window receives focus
 * @param {Function} handler function to invoke when window receives focus
 */
const useOnWindowFocus = (handler, options = {}) => {
  useEffect(() => {
    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [handler, options])
}

export default useOnWindowFocus
