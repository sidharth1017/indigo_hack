const express = require('express');
const config = require("./config/index.js")
const app = express();
const PORT = config.port;
const DbConnect = require("./mongoose");
DbConnect();

// CORS 
const cors = require("cors");
app.use(cors());

// Exporting Routes 
const router = require('./api/routes.js');
app.use(express.json());
app.use(router);

// Dummy Api to check express server
app.get('/', (req, res) => {
    res.send('Hello from Express server');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));