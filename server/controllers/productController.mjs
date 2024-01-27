import Product from "../models/product.mjs";


export const createProduct = async (req, res) => {
  const {productName, price, category, productDescription, createdBy} = req.body;
console.log(req.body,req.file,'ple')

try {
  // Assuming other form fields are available in req.body
  const { productName, productDescription, price, category } = req.body;

  // Create a new product instance
  const newProduct = new Product({
    productName,
    productDescription,
    price,
    category,
  });

  // Attach images to the new product instance
  if (req.files && req.files.length > 0) {
    newProduct.productImage = req.files.map((file) => ({
      data: file.buffer,
      contentType: file.mimetype,
      name: 'uploads/' + file.originalname,
    }));
  }

  // Save the new product to the database
  await newProduct.save();

  return res.status(201).json({ success: true, message: 'Product created successfully' });
} catch (error) {
  console.error('Error creating product:', error);
  return res.status(500).json({ error: 'Internal Server Error' });
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

