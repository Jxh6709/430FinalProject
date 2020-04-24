// for the post data
const nodemailer = require('nodemailer');
// for google to work
const { google } = require('googleapis');

const { OAuth2 } = google.auth;

// the client id, secret, and redirect url
const oauth2Client = new OAuth2(
  '563068775432-5hfj9qeffh48vfe5dbu1r9sauh176k2o.apps.googleusercontent.com',
  '7cLi7do0q_5D2JoTlENLgTRx',
  'https://developers.google.com/oauthplayground',
);
// the refresh_token
oauth2Client.setCredentials({
  refresh_token: '1//04Q-OON4Ul-kGCgYIARAAGAQSNwF-L9Ire7nhGSepIsLECSmpAaWBbr-lz_h9h9N8rYyST2JBnghlbt89LzaV-EZEZ4WGoo8W5PY',
});
const accessToken = oauth2Client.getAccessToken();

const sendEmail = (body, docBuf, nameOfFile) => {
  // setting up the from part of our email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'jxh6709@g.rit.edu',
      clientId: oauth2Client._clientId,
      clientSecret: oauth2Client._clientSecret,
      refreshToken: oauth2Client.credentials.refresh_token,
      accessToken,
    },
  });
  // all of the options conveniently in an object
  const mailOptions = {
    from: 'jxh6709@g.rit.edu',
    to: body.email,
    subject: body.subject,
    text: body.content,
    attachments: [
      {
        filename: nameOfFile,
        content: docBuf,
      },
    ],
  };
  // send it out with the current configuration
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      // something went wrong
      return { message: error };
    }
    // email sent
    return { message: info };
  });
};

module.exports = {
  sendEmail,
};
