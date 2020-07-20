const url = require('url')
const psl = require('psl')

module.exports = {
  toFullUrl: function (rawUrl, protocol='https') {
    let fullUrl = rawUrl
    // Prepend protocol if user didn't include it, otherwise the `url` library will error in the parsing step.
    if (!fullUrl.includes('http') && !fullUrl.includes('https')) {
      fullUrl = `${protocol}://${rawUrl}`
    }

    return fullUrl
  },

  /**
   * Transform a full url to a hostname: https://www.clay.run --> clay.run
   * @param {String} rawUrl url optionally with protocol (https://www.clay.run) or (https://clay.run)
   */
  toHostname: function (rawUrl) {
    try {
      let fullUrl = rawUrl
      // Prepend protocol if user didn't include it, otherwise the `url` library will error in the parsing step.
      if (!fullUrl.includes('http') && !fullUrl.includes('https')) {
        fullUrl = `https://${rawUrl}`
      }

      // Scrubs protocol and www, since some companies on LinkedIn use an apex domain (no www) and others do not.
      return url.parse(fullUrl).hostname.replace('www.', '')
    } catch (e) {
      console.log(e.message)
    }
  },

  /**
   * Transform a full url to a site name: https://www.clay.run --> clay
   * @param {String} rawUrl url optionally with protocol (https://www.clay.run) or (https://clay.run)
   */
  toSiteName: function (rawUrl) {
    try {
      let fullUrl = rawUrl
      // Prepend protocol if user didn't include it, otherwise the `url` library will error in the parsing step.
      if (!fullUrl.includes('http') && !fullUrl.includes('https')) {
        fullUrl = `https://${rawUrl}`
      }

      // Reduces url to hostname --> clay.run
      const hostname = url.parse(fullUrl).hostname.replace('www.', '')

      // Compares against known TLDs
      const {
        tld
      } = psl.parse(hostname)


      const [siteName] = hostname
        .split('.') // ['clay', 'run']
        .filter(piece => piece !== tld) // ['clay']

      return siteName
    } catch (e) {
      console.log(e.message)
    }
  },

  toPath: function (rawUrl) {
    try {
      return url.parse(rawUrl).path
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
}
