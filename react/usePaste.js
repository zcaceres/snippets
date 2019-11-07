import { useEffect } from 'react'

/**
 * Invoke `handler` when user pastes in the document.
 *
 * If `registerHandlerOnlyIf` is absent or all its conditions are true, handler will be registered.
 *
 * @param {Function} handler function to invoke on `paste` event
 * @param {Array<Boolean>} options (for extensibility) pass Array<Boolean> for `registerHandlerOnlyIf`
 */
export default function usePaste(handler, options = {}, dependencies = []) {
  const {
    registerHandlerOnlyIf,
  } = options
  useEffect(() => {
    /**
     * Register handler only if:
     * 1. user has not included any conditions via `registerHandlerOnlyIf`
     * 2. every condition in `registerHandlerOnlyIf` is true
     */
    if (_.isEmpty(registerHandlerOnlyIf) || registerHandlerOnlyIf.every(condition => Boolean(condition) === true)) {
      document.addEventListener('paste', handler)
    }

    return () => {
      document.removeEventListener('paste', handler)
    }
  }, [handler, registerHandlerOnlyIf, ...dependencies])
}
