/**
 * Written because `react-hotkeys-hooks` on npm requires that the component have focus to fire hotkeys.
 *
 * Better to have them on the document level if an element is present on the page.
 *
 * @param {String} key key to be matched
 * @param {Function} handler function to be called
 * @param {Object} options for extensibility
 */
export function useHotkey(key, handler, options = {}) {
  const {
    ctrlKey,
    metaKey
  } = options
  useEffect(() => {
    function takeAction(e) {
      if ((ctrlKey && e.key === key) ||
        (metaKey && e.key === key) ||
        ((!ctrlKey && !metaKey) && e.key === key)) {
        handler(e)
      }
    }

    document.addEventListener('keydown', takeAction)
    return () => document.removeEventListener('keydown', takeAction)

  }, [key, handler, options, ctrlKey, metaKey])
}
