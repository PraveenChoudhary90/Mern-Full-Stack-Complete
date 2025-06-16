const StuModel = require("../Model/StuModel");


const InsertStudent = async(req,res)=>{
   const {name, email, course, password} = req.body;
   const ImageUrl = req.files.map(file=>file.path);
   try {
    const Data  =await StuModel.create({
        name:name,
        email:email,
        course:course,
        password:password,
        defaultImage:ImageUrl[0],
        image:ImageUrl
    })
    res.status(200).send({msg:"Student is Inserted Successfully"});
   } catch (error) {
    console.log(error);
   }
}


const displaydata = async(req,res)=>{
    const Data = await StuModel.find();
    res.send(Data);
}



module.exports = {
    InsertStudent,
    displaydata
}