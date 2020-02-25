**
 * Makes a POST request that resolves *before* we receive a response. This lets us 'fire and forget' a request to another function.
 * @param {String} destinationUrl
 * @param {Object} payload
 */
async function fireAndForget(destinationUrl, payload) {
  const {
    hostname,
    path
  } = url.parse(destinationUrl)

  payload = JSON.stringify(payload)

  const options = {
    hostname,
    method: 'POST',
    path,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  }

  await new Promise((resolve, reject) => {
    const req = https.request(options)

    req.on('error', (e) => {
      reject(e)
    })

    req.write(payload)

    req.end(() => {
      // Don't wait for response, just resolve that request has finished
      resolve()
    })
  })
}
