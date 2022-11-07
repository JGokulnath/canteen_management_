require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: "https://developers.google.com/oauthplayground",
  });

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });

  /*const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token : error message(" + err);
      }
      resolve(token);
    });
  });*/

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      accessToken:
        "",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  return transporter;
};

module.exports = async (to, subject, text) => {
  try {
    let emailTransporter = await createTransporter();
    console.log("Created transporter successfuly");
    await emailTransporter.sendMail({
      subject: subject,
      text: text,
      to: to,
      from: EMAIL,
    });
  } catch (err) {
    console.log(err);
  }
};

const EMAIL = "kctcanteen@gmail.com";
const REFRESH_TOKEN =
  "";
const CLIENT_SECRET = "";
const CLIENT_ID =
  "";
