/**
 * Newlines render as SPACES in content editable.
 * We replace them with <br/> tags so they're rendered properly.
 * @param {String} text
 */
function newLinesToBRs(text) {
  return text.replace(/\n/g, '<br/>')
}

function bRsToNewLines(html) {
  return html.replace(/<br\/>/g, '\n')
}

/**
 * Performs all steps necessary to transform raw text string (as saved in DB) to a string of HTML safe (and human-readable) for ContentEditable.
 *
 * The inverse of `contentEdtitableHTMLToText`
 *
 * @param {String} text
 * @returns {String} sanitized HTML representation of text
 */
export function textToContentEditableHTML(rawText) {
  if (rawText === undefined || rawText === null) return rawText
  return newLinesToBRs(rawText)
}

/**
 * Transforms HTML needed by ContentEditable to a text string that's safe to
 * save for our DB.
 *
 * The inverse of `textToContentEditableHTML`
 *
 * @param {String} html
 * @returns {String} sanitized text representation of HTML
 */
export function contentEditableHTMLToText(html) {
  return bRsToNewLines(html).trim()
}

export function blockNewLines(e) {
  if (e.key === ENTER_KEY) e.preventDefault()
}

/**
 * Forces cursor (caret) to the final spot in a content editable element.
 *
 * Why?
 *
 * By default, contenteditable will put the cursor at the start of the content
 * editable element, event if text already exists inside.
 *
 * @param {Object} element DOMNode of a contentEditable element
 */
export function putCursorAtEndOfElement(contentEditableElement) {
  let range
  range = document.createRange()
  range.selectNodeContents(contentEditableElement)
  // False means collapse to range's end
  range.collapse(false)

  let selection
  // Removes existing ranges and forces cursor to collapsed range set above
  selection = window.getSelection()
  selection.removeAllRanges()
  // Makes collapsed ranged the visible selection
  selection.addRange(range)
}

/**
 * Remove any weird (non-plaintext) chars (like HTML) from the string serialized from the clipboard during the past event
 *
 * We use the 'insertText' rather than 'insertHTML' command so that newlines are preserved on paste!
 *
 * @param {Object} event
 */
export function pasteAsPlainText(event) {
  event.preventDefault()

  const text = event.clipboardData.getData('text/plain')
  document.execCommand('insertText', false, stripHTML(text))

  // We return false here so that undo (ctrl + z) still works
  return false
}

/**
 * We piggyback on the browser's parsing capabilities here rather than trying to write our own regex/function to remove HTML from a string.
 *
 * We must use the .textContent property so that newlines are preserved.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
 * @param {String} html
 */
function stripHTML(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

