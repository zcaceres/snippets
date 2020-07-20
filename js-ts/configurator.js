const path = require('path')

function config() {
  // We set NODE_ENV elsewhere, to make sure we load the right .env
  const ENV_FILE = process.env.NODE_ENV === 'dev' ? `dev.env` : '.env'

  require('dotenv').config({
    path: path.resolve(__dirname, ENV_FILE)
  })

  if (process.env.NODE_ENV === 'dev') console.log('Environment is DEV')
  else console.warn('Environment is PROD')
}


module.exports = config

