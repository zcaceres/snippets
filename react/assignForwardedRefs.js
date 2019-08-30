/**
 * A child component may receive a callback ref or a ref object when refs are forwarded. This makes sure the ref is assigned to either one.
 *
 * function setRef(ref) {
 *   assignForwardedRefs(forwardedRef, ref)
 *   myOtherRefInThisComponent.current = ref
 * }
 * <Component ref={setRef}
 *
 * @param {Object|Function} forwardedRef callback ref function or ref object that `refToAssign` will be assigned to
 * @param {Object} refToAssign React ref object
 */
export function assignForwardedRefs(forwardedRef, refToAssign) {
  if (forwardedRef) {
    if (typeof forwardedRef === 'function') {
      forwardedRef(refToAssign)
    } else {
      forwardedRef.current = refToAssign
    }
  }
}
