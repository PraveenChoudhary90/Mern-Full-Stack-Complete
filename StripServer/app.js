const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const ProductRoutes = require("./Routes/ProductRoute");


app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Parse incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
    console.log("DB IS CONNECTED");
})


app.use("/product", ProductRoutes);

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server is running on ${port}port`);
})