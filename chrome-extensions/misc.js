
export function addToDOM(elements) {
  elements = makeArray(elements);
  elements.forEach(el => document.body.appendChild(el))
}

function makeArray(maybeArray) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray]
}

export function removeFromDOM(elements) {
  elements = makeArray(elements);
  elements.forEach(el => el.parentElement.removeChild(el))
}

/**
 * Requires the `clipboardWrite` permission in the manifest.json for document.execCommand('copy') to work.
 * @param {String} text
 */
export function copyToClipboard(text) {
  //Create a textbox field where we can insert text to.
  var copyFrom = document.createElement('textarea');

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child.
  //"execCommand()" only works when there exists selected text, and the text is inside
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  document.execCommand('copy');

  //(Optional) De-select the text using blur().
  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}

export async function postRequest(url, payload) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: typeof payload === 'string' ? payload : JSON.stringify(payload)
  })
}


/**
 * Strips extraneous newlines and whitespace from text nodes
 * @param {String} text
 */
export function cleanUpTextNode(text) {
  return text
    .trim()
    .split('\n')
    .map(str => str.trim())
    .filter(el => el)
}

