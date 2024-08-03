const dotenv = require('dotenv');

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
    mongo: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/",
    },
    port: parseInt(process.env.PORT || "5500", 10) || 5500,
    hash: process.env.HASH_SECRET || "02553bec9c1a975d63f7ed039be19e98cca1",
    sms: {
        twilio: {
            sid: process.env.TWILIO_SMS_SID,
            auth_token: process.env.SMS_AUTH_TOKEN,
            number: process.env.SMS_FROM_NUMBER || "+916367562964"
        }
    },
    mail: {
        gmail: {
            id: process.env.EMAIL || "sidharthv605@gmail.com",
            password: process.env.PASSWORD
        } 
    }
};
