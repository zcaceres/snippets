
/**
 * Secure form of `window.open`.
 * @param {String} url
 * @see https://mathiasbynens.github.io/rel-noopener/
 */
export function safeWindowOpen(url) {
  window.open(url, '_blank', 'noopener noreferrer')
}

