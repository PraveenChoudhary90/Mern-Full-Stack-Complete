const mongoose = require("mongoose");
const StuModel = new mongoose.Schema({
    name:String,
    email:String,
    course:String,
    password:String,
    defaultImage:String,
    image:[String]

})


module.exports = mongoose.model("crudstudent", StuModel);