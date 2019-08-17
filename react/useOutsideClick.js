import {
  useEffect
} from 'react'
import ReactDOM from 'react-dom'

/**
 * Given a `targetRef` listen for clicks where clicked node is not contained within the `targetRef.current`, then invoke `handler`.
 *
 * Optionally `useCapture` via `options`.
 *
 * @param {Object} targetRef React ref object
 * @param {Function} handler function to invoke on outside click
 * @param {Object} options for extensibility, pass { useCapture } to capture event
 */
const useOnOutsideClick = (targetRef, handler, options = {}) => {
  const {
    useCapture
  } = options

  useEffect(() => {
    function handleClick(e) {

      /**
       * Future self alert: We have to use ReactDOM.findDOMNode to make sure .contains reflects the browser's DOM and not React's virtual dom. `findDOMNode` will give us the underlying node.
       */
      if (!targetRef.current || ReactDOM.findDOMNode(targetRef.current).contains(e.target)) return
      else handler(e)
    }

    document.addEventListener('click', handleClick, Boolean(useCapture))

    return () => {
      document.removeEventListener('click', handleClick, Boolean(useCapture))
    }
  }, [targetRef, handler, useCapture])
}

export default useOnOutsideClick
