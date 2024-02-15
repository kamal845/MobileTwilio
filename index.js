const express=require('express');
const mongoose=require('mongoose');
const app=express();
const bodyParser = require('body-parser');
require('dotenv').config();
const routes=require("./routes/route");
const connectionURL=require("./database/database");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const middleware1=require('./middleware/middleware');
app.use(middleware1);
port=3000;
try {
    app.listen(port, (req,res) => {
        connectionURL().then(() => {
            console.log("Server is started on port no. 3000");
        }).catch(error => {
            console.log("Error connecting to the database:", error);
        });
    });
} catch (error) {
    console.log("Error:", error);
}