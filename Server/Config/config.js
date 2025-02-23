const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const databaseURL = process.env.databaseURL;
const dataBaseConnect = async (req, res) => {
    try {
        const connect=mongoose.connect(databaseURL)?"Connect Success":"Not connected";
        console.log (connect);
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = dataBaseConnect;