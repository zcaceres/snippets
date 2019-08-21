const AWS = require('aws-sdk')
const {
  safelyStringify
} = require('./helpers')

const lambda = new AWS.Lambda({
  region: process.env.AWS_REGION,
  endpoint: process.env.IS_OFFLINE ? 'http://localhost:3001' : undefined
})

const AWS = require('aws-sdk')
const {
  safelyStringify
} = require('./helpers')

const lambda = new AWS.Lambda({
  region: process.env.AWS_REGION,
  endpoint: process.env.IS_OFFLINE ? 'http://localhost:3001' : undefined
})

module.exports.invokeLambda = async ({
  name,
  body = {},
  /*
   * By default, we invoke synchronously with 'RequestResponse'
   * to invoke asynchronously and get a response use 'Event'.
   */
  invocationType = 'RequestResponse'
}) => {
  const params = {
    FunctionName: name,
    InvocationType: invocationType,
    Payload: safelyStringify(body)
  }
  return new Promise((resolve, reject) => {
    lambda.invoke(params, function (error, data) {
      if (error) reject(new Error(`Error invoking LAMBDA name: ${name} with body ${JSON.stringify(body)} and type ${invocationType} ${JSON.stringify(error)}`))
      else return resolve(data)
    })
  })
}

/**
 * Lambda's generic event contains lots of metadata about the request.
 * Gets the body as a JS Object.
 */
module.exports.parseBody = (event) => {
  if (typeof event === 'string') {
    return JSON.parse(event)
  } else if (event.body) { // Assume is API Gateway payload
    return JSON.parse(event.body)
  } else { // Assume is already parsed
    return event
  }
}

/**
 * AWS Lambda expects responses to be in a particular format or will SILENTLY ERROR!
 *
 * See: https://dzone.com/articles/serverless-aws-http-gateway-502-bad-gateway
 *
 * Use this generic handler to format your responses to avoid these errors.
 *
 * @param {Object} body Response body to stringify
 * @param {Boolean} isError
 * @param {Object} rest Optional additional props for body
 */
module.exports.sendResponse = ({
  body,
  headers = {
    // FIXME: REMOVE CORS!!!
    'Access-Control-Allow-Origin': '*',
    'X-Content-Type-Options': 'nosniff',
    'Content-Type': 'application/json'
  },
  isError = false
}) => ({
  // BEWARE! NO OTHER PROPERTIES CAN BE ADDED TO THIS OBJECT OR API GATEWAY WILL REJECT THE RESPONSE
  headers,
  statusCode: isError ? 400 : 200,
  body: JSON.stringify({
    ...body,
    apiVersion: process.env.API_VERSION
  })
})
