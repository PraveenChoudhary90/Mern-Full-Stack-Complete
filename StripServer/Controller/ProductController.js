const ProductModel = require("../Model/ProductModel");


const InsertProduct = async(req,res)=>{
    const {name, brand, price} = req.body;
    const ImageUrl = req.files.map(file=>file.path);
    try {
        const Data = await ProductModel.create({
            name:name,
            brand:brand,
            price:price,
            defaultImage:ImageUrl[0],
            image:ImageUrl
        })

        res.status(200).send({msg:"Your data is inserted"});
        
    } catch (error) {
        console.log(error)
    }
}


const DisplayProduct = async(req,res)=>{
    const Data = await ProductModel.find();
    res.status(200).send(Data);
}

module.exports = {
    InsertProduct,
    DisplayProduct
}