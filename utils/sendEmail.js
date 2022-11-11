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
        "ya29.a0AeTM1icCVnL7U2ZmjKzRwaCiCPzc51E1o35Hpdy8veTVefY4xVY04Nd5eKNdva5kSc4lbi7a2lmF1lr01hgvPz4uPjoM4nfCGF7OMY5OXBfmpZXZihQCBiBJa1BxOQQm2WtOi5oVsRyqo2N8o9JW4f8ZFUgmaCgYKAR4SARASFQHWtWOmArWfW6oNqYZ9mOurrM5NOg0163",
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
  "1//04yir36dVuNrMCgYIARAAGAQSNwF-L9Irkky8CVX0hqAKU-x45qWT1mQeC-SozJxM37fcNdpdXdnEuo0IKzKqDcok7tRWib6y2nE";
const CLIENT_SECRET = "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";
const CLIENT_ID =
  "582972806821-thck7sk99kh1r2sbctaoaruiag1t5ns8.apps.googleusercontent.com";
