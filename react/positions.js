
/**
 * For `element`, get distance from top and bottom of window.
 * @param {DOMNode} element
 * @returns {Array<Number, Number>} Distance from [top, bottom]
 */
export function getDistanceFromWindowTopAndBottom(element) {
  const rect = element.getBoundingClientRect()
  const distanceFromBottom = window.innerHeight - rect.top
  return [rect.top, distanceFromBottom]
}

/**
 * For `element`, get distance from left and right of window.
 * @param {DOMNode} element
 * @returns {Array<Number, Number>} Distance from [left, right]
 */
export function getDistanceFromWindowLeftAndRight(element) {
  const rect = element.getBoundingClientRect()
  const distanceFromRight = window.innerWidth - rect.left
  return [rect.left, distanceFromRight]
}

export function isInRightSideOfWindow(element) {
  const [left, right] = getDistanceFromWindowLeftAndRight(element)
  return left > right
}

export function isInBottomHalfOfWindow(element) {
  const [top, bottom] = getDistanceFromWindowTopAndBottom(element)
  return top > bottom
}

/**
 * Get coordinates of top left corner of `element`
 * @param {DOMNode} element
 * @returns {Array<Number, Number>} X, Y coordinates of top left point of `element`
 */
export function getTopLeftXY(element) {
  return [offsetRight(element), offsetTop(element)]
}

/**
 * Get coordinates of top right corner of `element`
 * @param {DOMNode} element
 * @returns {Array<Number, Number>} X, Y coordinates of top left point of `element`
 */
export function getTopRightXY(element) {
  return [offsetLeft(element), offsetTop(element)]
}

/**
 * Get coordinates of bottom left corner of `element`
 * @param {DOMNode} element
 * @returns {Array<Number, Number>} X, Y coordinates of bottom left point of `element`
 */
export function getBottomLeftXY(element) {
  return [offsetRight(element), offsetBottom(element)]
}

// Returns bottom offset value + or - from viewport top
function offsetBottom(element) {
  return element.getBoundingClientRect().bottom
}

function offsetRight(element) {
  return element.getBoundingClientRect().left
}

function offsetLeft(element) {
  return element.getBoundingClientRect().right
}

// Returns bottom offset value + or - from viewport bottom
function offsetTop(element) {
  return element.getBoundingClientRect().top
}

/**
 * For `element`, get full width and height (includes padding).
 * @param {DOMNode} element
 * @returns {Array<Number, Number>} [Height, Width] in px
 */
export function getDimensionsOfElement(element) {
  return [element.offsetHeight, element.offsetWidth]
}

export const autoAdjustSizeInput = ({
  event,
  initialHeight,
  onlyExpandHorizontally=false
}) => {
  const { target } = event
  // Reset style overrides so we use component's height and width
  target.style.height = ''
  target.style.width = ''

  const MIN_HEIGHT_EXPANSION = 2
  const MAX_HEIGHT_EXPANSION = 400

  // Larger scrollHeight indicates text input growing to wrap to a new line
  const shouldExpand = target.scrollHeight > initialHeight
  if (shouldExpand) {
    if (onlyExpandHorizontally) {
      target.style.height = `${initialHeight + MIN_HEIGHT_EXPANSION}px`
      target.style.width = '120%'
    } else {
      target.style.height = Math.min(target.scrollHeight, MAX_HEIGHT_EXPANSION)
    }
  }
}
