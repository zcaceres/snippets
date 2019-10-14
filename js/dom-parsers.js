const jsdom = require('jsdom')
const { JSDOM } = jsdom

module.exports.toJSDOM = function toJSDOM(responseBody) {
  return new JSDOM(responseBody);
}

module.exports.analyzeBody = function analyzeBody(bodyDOM) {
  const titleTag = getTitleTag(bodyDOM)
  const headScripts = getHeadScripts(bodyDOM)
  const jsonld = getJsonldFromScripts(headScripts)
  const meta = getMetaTagsFromBody(bodyDOM)
  const metaTitles = getTitleFromMeta(meta)
  const descriptions = [
    ...getDescriptionFromJSONLD(jsonld),
    ...getTypesFromJSONLD(jsonld),
    ...getDescriptionFromMeta(meta)
  ]

  const results = {
    titles: [titleTag].concat(metaTitles),
    descriptions
  }
  return results
}

function nodeListToArray(nl) {
  return Array.from(nl)
}

function getTitleTag(bodyDOM) {
  const titleTag = getElementsByTagName(bodyDOM, 'title')[0]
  return (titleTag ? titleTag.text : '').trim()
}

function getHeadScripts(bodyDOM) {
  return nodeListToArray(bodyDOM.window.document.head.querySelectorAll('script'))
}

function getJsonldFromScripts(scripts) {
  return scripts.filter(sc => sc.type === 'application/ld+json')
    .map((el) => {
      try {
        return JSON.parse(el.text.trim())
      } catch (e) {
        return null
      }
    }).filter(script => script)
}

function getMetaTagsFromBody(bodyDOM) {
  const metaTags = getMetaTags(bodyDOM)
  return metaTags.filter(isUsefulMetaTag).map((metaTag) => {
    var pickName = metaTag.getAttribute('itemprop') || metaTag.getAttribute('property') || metaTag.getAttribute('name')
    return {
      name: pickName,
      content: metaTag.content
    }
  })
}

function isUsefulMetaTag(metaTag) {
  return metaTag.getAttribute('itemprop') || metaTag.getAttribute('name') || metaTag.getAttribute('property');
}

function getMetaTags(bodyDOM) {
  return nodeListToArray(bodyDOM.window.document.head.querySelectorAll('meta'))
}

function getElementsByTagName(bodyDOM, tagName) {
  return nodeListToArray(bodyDOM.window.document.querySelectorAll(tagName))
}

function getTitleFromMeta(metaTags) {
  return getMatchingMetaContent(metaTags, ['og:site_name', 'og:title', 'twitter:title'])
}

function getDescriptionFromJSONLD(jsonld) {
  return jsonld.filter(entry => entry.description && typeof entry.description === 'string').map(entry => entry.description.trim())
}

function getTypesFromJSONLD(jsonld) {
  return jsonld.filter(entry => entry['@type'] && typeof entry['@type'] === 'string').map(entry => entry['@type'].trim())
}

function getDescriptionFromMeta(metaTags) {
  return getMatchingMetaContent(metaTags, ['description', 'og:description', 'twitter:description', 'keywords'])
}

function getMatchingMetaContent(metaTags, matches) {
  return metaTags
    .filter(metaTag => (metaTag.content && matches.indexOf(metaTag.name) >= 0))
    .map(metaTag => metaTag.content)
}
