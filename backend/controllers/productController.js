import Product from "../models/productModel.js";
import mongoose  from "mongoose"

export const createdItems = async(req,res) => {
    const productData = await Product(req.body)
    if(!productData.name || (!productData.price && productData.price != 0) || !productData.image){
        return res.status(404).json({ success : false, message: "Provide all fields"})
    }
    try {
        const existingProduct = await Product.findOne({
            name: productData.name,
            price: productData.price,
            image: productData.image
        });
        if (existingProduct) {
            return res.status(404).json({ success: false, message: "Product with the same details already exists" });
        }
        await productData.save();
        res.status(200).json({ success: true , data : productData});
    } catch (error) {
        console.error("Error in create product", error.message);
        res.status(500).json({success: false , message : "server error"})
    }
};

export const getProductItems = async(req,res) => {
    try {
        const totalItems = await Product.find({});
        res.status(200).json({success: true, messgae : "Total Items" , data : totalItems})
    } catch (error) {
        console.error("Error in create product", error.message);
        res.status(500).json({success: false , message : "server error"})
    }
}

export const updateProductItems = async(req,res) =>{
    const id = req.params.id;
    const product = req.body;
    try {
        const UpdateProduct = await Product.findByIdAndUpdate(id, product, {new:true})
        res.status(200).json({success: true, message:"Product Updated successfully",  data:UpdateProduct})
    } catch (error) {
        console.error("Error in create product", error.message);
        res.status(500).json({success: false , message : "server error"})
    }
}

export const deleteProductItems = async(req,res) => {
    const id = req.params.id;
    
    try {
        const productExist = await Product.findOne({_id: id})
        if(!productExist){
            return res.status(404).json({success:false, message:"Product Not Found"})
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success : true, message : "Product successfully Deleted" ,});
    } catch (error) {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success:false, message:"Invalid Product ID"});
        };
        console.error("Error in Product" , error.message)
        res.status(500).json({
            success : false, message : "Server Error"
        })
    }
}