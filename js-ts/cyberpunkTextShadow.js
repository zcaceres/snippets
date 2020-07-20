const HUE_SHIFT_INTENSITY = 6;

/**
 * Generates a shadow with a random offset to the left and right. Call in a loop to create a terminal-like effect
 */
function generateTextShadow() {
  let x = -1 + 2 * Math.random();
  x = x * x;
  const intensity = HUE_SHIFT_INTENSITY * x;
  return `text-shadow: ${intensity}px 0 1px rgba(0,30,255,0.5), ${-intensity}px 0 1px rgba(255,0,80,0.3), 0 0 3px !important;`
}
