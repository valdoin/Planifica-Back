const express = require('express');
const connectDB = require("./db");
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const cors = require('cors');


connectDB();
const app = express();
const PORT = 5000;
const server = app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
module.exports = app;

process.on("unhandledRejection", err => {
    console.log(`an error occured: ${err.message}`);
    server.close(() => process.exit(1));
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/login', authController.login);