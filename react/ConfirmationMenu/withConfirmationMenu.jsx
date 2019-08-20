import store from 'store'
import {
  SHOW_CONFIRMATION_MENU,
  HIDE_CONFIRMATION_MENU
} from 'actions/actions-types'
import {
  getTopLeftXY,
  getDistanceFromTopWithScroll,
  getDistanceFromLeftWithScroll,
} from 'feUtils'
import noop from 'lodash/noop'

function getDistanceFromTopWithScroll(e) {
  return e.clientY + window.pageYOffset
}

function getDistanceFromLeftWithScroll(e) {
  return e.clientX + window.pageXOffset
}

export function closeConfirmationMenu() {
  store.dispatch({
    type: HIDE_CONFIRMATION_MENU,
  })
}

/**
 * Returns a handler for the an arbitrary event that should trigger a confirmation menu.
 *
 * A component invokes this function with a configuration (see props).
 *
 *
 * @param {String} menuType Enum of menu type 'floating' or 'fixed'. Floating appears beneath mouse click. Fixed appears relative to the event target.
 * @param {String} title Text to display in bold at top of menu
 * @param {String} subtitle Text to display in middle of menu
 * @param {String} confirmLabel Text for confirm button default: 'Confirm'
 * @param {Function} onConfirm Handler to invoke when user clicks Confirm button
 * @param {Boolean} isShowing Indicates if menu is visible
 * @param {DOMNode} nodeToPositionBeneath Optionally force menu to use a DOMNode rather than event target for positioning
 * @param {Object<x: Number, y:Number>} position
 * @param {Object} style
 *
 * @returns {Function}
 */
export default function withConfirmationMenu({
  menuType = 'fixed',
  title = 'Are you sure you want to take this action?',
  subtitle = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  onConfirm = noop,
  nodeToPositionBeneath,
  isShowing = true,
  position,
  style = {},
}) {
  return e => {
    e.preventDefault()
    e.stopPropagation()

    let newPosition;
    if (menuType === 'floating') {
      newPosition = {
        x: getDistanceFromLeftWithScroll(e),
        y: getDistanceFromTopWithScroll(e)
      }
    } else if (menuType === 'fixed') {
      if (nodeToPositionBeneath) {
        const [x, y] = getTopLeftXY(nodeToPositionBeneath)
        newPosition = {
          x,
          y
        }
      } else {
        // We use `.currentTarget` not `.target` so that only the target with the event handler that triggers the menu is used for positioning
        const [x, y] = getTopLeftXY(e.currentTarget)
        newPosition = {
          x,
          y
        }
      }
    } else {
      newPosition = position
    }

    store.dispatch({
      type: SHOW_CONFIRMATION_MENU,
      configuration: {
        menuType,
        title,
        subtitle,
        confirmLabel,
        confirmAction: onConfirm,
        isShowing,
        style,
        position: newPosition
      }
    })
  }
}
