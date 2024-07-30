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
};
