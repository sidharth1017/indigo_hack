const crypto = require("crypto");
const hashService = require("./hashService");
const nodemailer = require("nodemailer");
const config = require("../config/index.js");

const smsSid = config.sms.twilio.sid;
const smsAuthToken = config.sms.twilio.auth_token;

const twilio = require("twilio")(smsSid, smsAuthToken, {
  lazyLoading: true,
});

class OtpService {
  async generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendBySms(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: config.sms.twilio.number,
      body: `Your login OTP for Indigo 6E is ${otp}`,
    });
  }

  async sendByMail(email, otp) {
    try {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: config.mail.gmail.id, 
          pass: config.mail.gmail.password, 
        },
      });

      const mailOptions = {
        from: config.mail.gmail.id, 
        to: email,
        subject: "Indigo 6E OTO", 
        text: `Your login OTP for Indigo 6E is ${otp}`, 
      };

      let info = await transporter.sendMail(mailOptions);
      return true; 
    } catch (error) {
      console.error("Error sending email: ", error);
      return false;
    }
  }

  verifyOtp(hashedOtp, data) {
    let computedHash = hashService.hashOtp(data);
    return computedHash === hashedOtp;
  }
}

module.exports = new OtpService();
