const sendGridMail = require('@sendgrid/mail');
require("dotenv").config();
const path = require('path');
const ejs = require('ejs');


const sendEmail = async (email, subject, title, text) => {


  emailTemplate =  await ejs.renderFile(path.join(__dirname, '../views/sendEmail.ejs'),
    {
      title: title,
      text: text
    })


  sendGridMail.setApiKey(process.env.SENDGRID_KEY);

  function getMessage() {
    return {
      to: email,
      from: `${process.env.SENDGRID_EMAIL}`,
      subject,
      html: emailTemplate,
    };
  }

  async function sendEmail() {
    try {
      await sendGridMail.send(getMessage());
      console.log('Test email sent successfully');
    } catch (error) {
      console.error('Error sending test email');
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }
  }

  (async () => {
    console.log('Sending test email');
    await sendEmail();
  })();
}

module.exports = sendEmail