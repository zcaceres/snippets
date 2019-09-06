import {
  useEffect
} from 'react'

/**
 * Written because `react-hotkeys-hooks` on npm requires that the component have focus to fire hotkeys.
 *
 * For some cases it's better to have key bindings on the document level simply if an element is present on the page.
 *
 * @param {String} targetKey key to be matched
 * @param {Function} handler function to be called
 * @param {Object} options for extensibility
 */
export default function useHotkey(targetKey, handler, options = {}) {
  const {
    withCtrlKey,
    withMetaKey,
    useCapture,
    useKeyUpEvent,
  } = options
  useEffect(() => {
    function takeAction(e) {
      const {
        ctrlKey,
        metaKey,
        key
      } = e
      // chord with ctrlKey
      if (withCtrlKey && (ctrlKey && key === targetKey)) {
        handler(e)
        // chord with metaKey
      } else if (withMetaKey && (metaKey && key === targetKey)) {
        handler(e)
        // No chord... TODO: make this not so ugly
      } else if ((!ctrlKey && !metaKey) &&
        (!withMetaKey && !withCtrlKey) &&
        (key === targetKey)) {
        handler(e)
      }
    }

    if (useKeyUpEvent) {
      document.addEventListener('keyup', takeAction, Boolean(useCapture))
    } else {
      document.addEventListener('keydown', takeAction, Boolean(useCapture))
    }

    return () => {
      if (useKeyUpEvent) {
        document.removeEventListener('keyup', takeAction, Boolean(useCapture))
      } else {
        document.removeEventListener('keydown', takeAction, Boolean(useCapture))
      }
    }

  }, [handler, options, withCtrlKey, targetKey, withMetaKey, useCapture, useKeyUpEvent])
}
