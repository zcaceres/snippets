const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY
const domain = process.env.NODE_ENV === 'production' ? process.env.MAILGUN_DOMAIN_PRODUCTION : process.env.MAILGUN_DOMAIN_DEV
const nodemailer = require('nodemailer')
const mailgun = require('nodemailer-mailgun-transport')

const AUTH = {
  auth: {
    api_key: MAILGUN_API_KEY,
    domain
  }
}
const transporter = nodemailer.createTransport(mailgun(AUTH))

const addSignatures = (email) => {
  if (!email.text || !email.html) throw new Error('Tried to send invalid email')
  email.text += `
    Many thanks,\n
    Your Project Here
  `
  email.html += `
    <p>Many thanks,</p>
    <p>Your Project Here</p>
  `
  return email
}

/**
 * Promisified version of Mailgun handler for sending transactional emails
 * @param  {String} from    from: 'Excited User <me@samples.mailgun.org>',
 * @param  {String} to      to: 'serobnic@mail.ru',
 * @param  {String} template name of template for email
 * @return {Promise}
 */
async function sendMail({
  from,
  to,
  template,
  text,
  subject,
  html
}) {
  const email = {
    from,
    to,
    subject,
    text,
    html
  }
  try {
    const responseInfo = await transporter.sendMail(addSignatures(email))
    return responseInfo
  } catch (e) {
    console.error(e.message)
  }
}

module.exports = {
  sendMail
}
