/**
 * Hook to make sure any absolutely positioned element of `domElementWidth` and `domElementHeight` that tries to position itself to coordinates `targetPosition` never positions itself beyond the edges of the window.
 *
 * At most, it will be 1px away from the right or top edge of the window.
 *
 * By default the absolute positioned element will be to the bottom right corner of the parent element.
 * But it will adapt to the window and move the absolute positioned element
 * to the right corner.
 *
 * @param {Object<Number>} targetPosition top-left coordinates that element is trying to use to position itself
 * @param {Number} domElementWidth width of DOM element being positioned
 * @param {Number} domElementHeight height of DOM element being positioned
 */
export function useWindowSizeToRestrictElementPosition(targetPosition, domElementWidth, domElementHeight) {
  const windowHeight = window.innerHeight
  const windowWidth = window.innerWidth

  const MIN_DISTANCE_FROM_EDGE_PX = 1

  const maxLeftPositioningBeforeHittingWindowEdge = windowWidth - domElementWidth - MIN_DISTANCE_FROM_EDGE_PX
  let leftPositioning = Math.max(targetPosition.x, MIN_DISTANCE_FROM_EDGE_PX)

  if(leftPositioning > maxLeftPositioningBeforeHittingWindowEdge) {
    // put the box on the left side of the element
    leftPositioning = Math.max(targetPosition.x - domElementWidth - MIN_DISTANCE_FROM_EDGE_PX, MIN_DISTANCE_FROM_EDGE_PX)
  }

  const maxTopPositioningBeforeHittingWindowEdge = windowHeight - domElementHeight - MIN_DISTANCE_FROM_EDGE_PX
  let topPositioning = Math.max(targetPosition.y, MIN_DISTANCE_FROM_EDGE_PX)

  if(topPositioning > maxTopPositioningBeforeHittingWindowEdge) {
    // put the box above the element
    topPositioning = Math.max(targetPosition.y - domElementHeight - MIN_DISTANCE_FROM_EDGE_PX, MIN_DISTANCE_FROM_EDGE_PX)
  }

  return [leftPositioning, topPositioning]
}

