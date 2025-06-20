
const express  =require("express");
const route = express.Router();
const multer = require('multer');
const path = require('path');

const StuController = require("../Controller/StuController");



// Configure storage engine and filename
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Initialize upload middleware and add file size limit
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // 1MB file size limit
  })
  





route.post("/insertstudent",upload.array("image", 10),StuController.InsertStudent);
route.get("/displaydata", StuController.displaydata);
route.post("/DeleteData", StuController.DeleteData);
route.post("/UpdateShowData", StuController.UpdateShowData);
route.post("/UpDateAllData", StuController.UpDateAllData);
route.post("/SearchData", StuController.SearchData);





module.exports = route;