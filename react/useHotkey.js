/**
 * Written because `react-hotkeys-hooks` on npm requires that the component have focus to fire hotkeys.
 *
 * Better to have them on the document level if an element is present on the page.
 *
 * @param {String} targetKey key to be matched
 * @param {Function} handler function to be called
 * @param {Object} options for extensibility
 */
export function useHotkey(targetKey, handler, options = {}) {
  const {
    withCtrlKey,
    withMetaKey
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
        // No chord
      } else if (!ctrlKey && !metaKey &&
        (!withMetaKey && !withCtrlKey) &&
        (key === targetKey)) {
        handler(e)
      }
    }

    document.addEventListener('keydown', takeAction)
    return () => document.removeEventListener('keydown', takeAction)

  }, [handler, options, withCtrlKey, targetKey, withMetaKey])
}
