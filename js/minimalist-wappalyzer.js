const Wappalyzer = require('wappalyzer-core')
const fetch = require('node-fetch')

const WAPPALYZER_REGEXES = "https://raw.githubusercontent.com/AliasIO/wappalyzer/master/src/apps.json"

module.exports = function wappalyzer() {
  return {
    /**
     * NOTE: This is a minimal version of Wappalyzer using `wappalyzer-core`.
     *
     * We are constrained by size limits from running the full build of the
     * `wappalyzer` package, which contains a large build of chromium/puppeteer.
     *
     * This solution works by stripping out the parser/analyzer portion of the
     * Wappalyzer library and feeding it the raw HTML.
     *
     * Since we don't use headless Chrome, the HTML we fetch will likely be less
     * hydrated and therefore less reflective of the true list of technologies.
     *
     * We should find a longer term solution to get the best possible analysis.
     */
    analyze: async (url) => {
      try {
        const [apps, html] = await Promise.all([
          fetch(WAPPALYZER_REGEXES).then(res => res.json()), // fetch the latest regexes from Wappalyzer repo...
          fetch(url).then(res => res.text()) // fetch the actual HTML...
        ])

        const { apps: technologies, categories } = apps

        // Wapp config
        Wappalyzer.setTechnologies(technologies)
        Wappalyzer.setCategories(categories)

        const detections = Wappalyzer.analyze({
          url,
          html
        });

        return Wappalyzer.resolve(detections)

      } catch (e) {
        console.log(e)
        return { error: 'COULD_NOT_FETCH' }
      }
    }
  }
}
