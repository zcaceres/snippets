import {
  useEffect
} from 'react'
import ReactDOM from 'react-dom'

const useOnOutsideClick = (ref, callback, options = {}) => {
  const {
    useCapture
  } = options

  useEffect(() => {
    const handleClick = e => {

      /**
       * Edge case alert! We have to use ReactDOM.findDOMNode to make sure .contains reflects the DOM and not react's virtual dom.
       *
       * `findDOMNode` will give us the underly node
       */
      if (!ref.current || ReactDOM.findDOMNode(ref.current).contains(e.target)) return
      else callback()
    }
    document.addEventListener('click', handleClick, Boolean(useCapture))

    return () => {
      document.removeEventListener('click', handleClick, Boolean(useCapture))
    }
  }, [ref, callback, useCapture])
}

export default useOnOutsideClick
