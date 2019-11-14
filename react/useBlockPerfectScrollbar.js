import { useEffect } from 'react'

/**
 * Hook to disable scroll behavior for our <PerfectScrollbar> dependency (look in <TableView/> for the component)
 *
 * When a component that uses this hook is mounted, we block all events used by the PerfectScrollbar for our table.
 *
 * This prevents the surrounding table from scrolling, while still allowing child elements to scroll.
 *
 * This only exists due to limitations around PerfectScrollbar, meaning that this is a @HACK and we should delete this code along with PerfectScrollbar :-)
 */
export default function useSuppressTableScroll() {
  useEffect(() => {
    const scrollBar = document.querySelector('.scrollbar-container')

    function blockScroll(e) {
      e.stopPropagation()
    }

    scrollBar.addEventListener('wheel', blockScroll, true)
    scrollBar.addEventListener('scroll', blockScroll, true)
    scrollBar.addEventListener('ps-scroll-x', blockScroll, true)
    scrollBar.addEventListener('ps-scroll-y', blockScroll, true)

    return () => {
      scrollBar.removeEventListener('wheel', blockScroll, true)
      scrollBar.removeEventListener('scroll', blockScroll, true)
      scrollBar.removeEventListener('ps-scroll-x', blockScroll, true)
      scrollBar.removeEventListener('ps-scroll-y', blockScroll, true)
    }
  }, [])
}


