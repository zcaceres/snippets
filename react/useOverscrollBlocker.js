import {
  useEffect
} from 'react'

/**
 * 
 * @param {*} elementRef 
 * @param {*} options 
 */
const useOverscrollBlocker = (elementRef, options = {}) => {
  useEffect(() => {
    function blockOverscroll(event) {
      // We don't want to scroll below zero or above the width and height
      var maxX = this.scrollWidth - this.offsetWidth
      var maxY = this.scrollHeight - this.offsetHeight

      // If this event looks like it will scroll beyond the bounds of the elementRef, prevent it and set the scroll to the boundary manually

      if (this.scrollLeft + event.deltaX < 0 ||
        this.scrollLeft + event.deltaX > maxX ||
        this.scrollTop + event.deltaY < 0 ||
        this.scrollTop + event.deltaY > maxY) {

        event.preventDefault()

        // Manually set the scroll to the boundary
        this.scrollLeft = Math.max(0, Math.min(maxX, this.scrollLeft + event.deltaX))
        this.scrollTop = Math.max(0, Math.min(maxY, this.scrollTop + event.deltaY))
      }
    }

    if (!elementRef.current) return
    elementRef.current.addEventListener('mousewheel', blockOverscroll, false)

    return () => elementRef.current.removeEventListener('mousewheel', blockOverscroll)
  }, [])
}

export default useOverscrollBlocker
