/**
 * Maps a file-path e.g. `/assets/img/logo.jpg` to a URL supported by the Chrome runtime in an extension i.e. `chrome://abc123def456/assets/img/logo.jg`
 * @param {String} url
 */
export function getBundledResource(url) {
  return chrome.extension.getURL(url)
}


