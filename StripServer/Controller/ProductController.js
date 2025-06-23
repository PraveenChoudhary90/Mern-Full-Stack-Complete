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

module.exports = {
    InsertProduct
}