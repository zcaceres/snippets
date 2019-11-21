import { useEffect } from 'react'
import _ from 'lodash'

/**
 * Written because `react-hotkeys-hooks` on npm requires that the component have focus to fire hotkeys.
 *
 * For some cases it's better to have key bindings on the document level simply if an element is present on the page.
 *
 * @param {String|Array<String>} targetKeys key(s) to be matched
 * @param {Function} handler function to be called
 * @param {Object} options for extensibility
 */
export default function useHotkey(targetKeys, handler, options = {}) {
  const keysToMatch = Array.isArray(targetKeys) ? targetKeys : [targetKeys]
  const {
    withCtrlKey,
    withMetaKey,
    useCapture,
    useKeyUpEvent,
    registerHandlerOnlyIf
  } = options
  useEffect(() => {
    function takeAction(e) {
      const {
        ctrlKey,
        metaKey,
        key
      } = e
      // chord with ctrlKey
      if (withCtrlKey && (ctrlKey && keysToMatch.includes(key))) {
        handler(e)
        // chord with metaKey
      } else if (withMetaKey && (metaKey && keysToMatch.includes(key))) {
        handler(e)
        // No chord... TODO: make this not so ugly
      } else if ((!ctrlKey && !metaKey) &&
                 (!withMetaKey && !withCtrlKey) &&
                 (keysToMatch.includes(key))) {
        handler(e)
      }
    }


    /**
     * Register handler only if:
     * 1. user has not included any conditions via `registerHandlerOnlyIf`
     * 2. every condition in `registerHandlerOnlyIf` is true
     */
    if (_.isEmpty(registerHandlerOnlyIf) || registerHandlerOnlyIf.every(condition => Boolean(condition))) {
      if (useKeyUpEvent) {
        document.addEventListener('keyup', takeAction, Boolean(useCapture))
      } else {
        document.addEventListener('keydown', takeAction, Boolean(useCapture))
      }
    }

    return () => {
      if (useKeyUpEvent) {
        document.removeEventListener('keyup', takeAction, Boolean(useCapture))
      } else {
        document.removeEventListener('keydown', takeAction, Boolean(useCapture))
      }
    }

  }, [handler, options, registerHandlerOnlyIf, withCtrlKey, targetKeys, withMetaKey, useCapture, useKeyUpEvent])
}
