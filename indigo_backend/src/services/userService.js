const userSchema = require("../models/userSchema");

class UserService {
  async findUser(filter) {
    const user = await userSchema.findOne(filter);
    return user;
}

async createUser(data) {
    const user = await userSchema.create(data);

    return user;
}
}
module.exports = new UserService();
