const { default: mongoose } = require("mongoose");
const config = require("./config/index.js")


function DbConnect() {
  const DB_URL = config.mongo.uri;

  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection Error"));
  db.once("open", () => {
    console.log("DB Connected");
  });
}

module.exports = DbConnect;
