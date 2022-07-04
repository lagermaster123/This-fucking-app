const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = process.env.GOOGLE_ID
const CLIENT_SECRET = process.env.GOOGLE_SECRET
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

module.exports.SendEmail = async (to, subject, body, from) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'mike@mp.productions',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: body
        }

        const result = await transport.sendMail(mailOptions)
        return result
    } catch(error) {
        return error
    }
}