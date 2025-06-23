const mongoose = require("mongoose");
const ProductModel = new mongoose.Schema({
    name:String,
    brand:String,
    price:String,
    defaultImage:String,
    image:[String]
})

module.exports = mongoose.model("product", ProductModel);