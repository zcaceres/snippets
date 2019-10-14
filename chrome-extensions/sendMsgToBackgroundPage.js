
/**
 * Serialize a message `msg` and data `payload` to the background page. The background page may optionally send a response.
 *
 * @param {String} msg
 * @param {Object} payload
 * @returns {Promise<Object>} Response from background page
 */
export function sendMessageToBackgroundPage(msg, payload = {}) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ msg, payload }, (response) => {
      /**
       * Chrome does not use the standard (err, response) callback format. The callback does not send any errors.
       *
       * We instead must check the `runtime.lastError` global to see if something went wrong.
       */
      const err = chrome.runtime.lastError
      if (err) return reject(err)
      resolve(response)
    })
  })
}


