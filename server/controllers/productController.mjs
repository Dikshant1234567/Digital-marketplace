import Product from "../models/product.mjs";

export const createProduct = async (req, res) => {
  const {productName, price, category, productDescription, createdBy} = req.body;
  try {
    const product = await Product.create({
      productDescription,
      productName,
      price,
      category,
      createdBy,
      productImage: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        name: "uploads/" + req.file.filename,
      },
    });

    await product.save();
    return res.status(200).send({success: true});
  } catch (e) {
    return res.status(400).send({success: false, message: e});
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const data = await Product.find();
    return res.status(200).send({success: true, data: data});
  } catch (e) {
    return res.status(400).send({success: false, message: e});
  }
};


export const getSingleProduct = async (req, res) => {
  const id = req.params.id;

  console.log(id,'iddd')
  try {
    const data = await Product.findById(id);
    if(data){

      return res.status(200).send({success: true, data: data});
    }else{
      return res.status(200).send({success: false, data: 'Item not found'});
    }
  } catch (e) {
    return res.status(400).send({success: false, message: e});
  }
};

