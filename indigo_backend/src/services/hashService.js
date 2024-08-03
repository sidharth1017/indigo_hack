const crypto = require('crypto');
const config = require("../config/index.js")

class HashService {
    hashOtp(data) {
        return crypto.createHmac('sha256', config.hash).update(data).digest('hex');
    }
}


module.exports = new HashService();