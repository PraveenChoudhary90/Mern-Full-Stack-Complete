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


const DeleteData = async(req,res)=>{
    const {id} = req.body;
    const Data = await StuModel.findByIdAndDelete(id);
    res.send({msg:"Your Data Is Deleted"})
}


const UpdateShowData = async(req,res)=>{
    const {id} = req.body;
     try {
        const Data = await StuModel.findById(id);
        res.send(Data);
     } catch (error) {
        console.log(error);
     }
}

const UpDateAllData = async(req,res)=>{
    const {_id} = req.body;
    const Data = await StuModel.findByIdAndUpdate(_id, req.body);
    res.send("okk data ")
}


module.exports = {
    InsertStudent,
    displaydata,
    DeleteData,
    UpdateShowData,
    UpDateAllData
}