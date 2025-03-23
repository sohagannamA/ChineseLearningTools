const express = require("express");
const Router = require("./Routes/route")
const dotenv = require("dotenv");
const cors = require("cors");

const Dbconnect = require("./Config/config");
dotenv.config();
const PORT = process.env.PORT || 8000
const HOSTNAME = process.env.LOCALHOST;


const app =express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
   origin: '*', // সব জায়গা থেকে রিকুয়েস্ট গ্রহণ করবে
   methods: ['GET', 'POST'], // যে HTTP methods অনুমোদিত
   allowedHeaders: ['Content-Type', 'Authorization'], // যে headers অনুমোদিত
}));
app.use(Router);
app.listen(PORT,HOSTNAME,()=>{
    console.log(`Your server is running at: http://${HOSTNAME}:${PORT}`)
    Dbconnect();
});
