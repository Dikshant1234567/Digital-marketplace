import Product from "../models/product.mjs";
import { promises as fsPromises } from 'fs';

export const createProduct = async (req, res) => {
  const {productName, price, category, productDescription, createdBy} = req.body;

  try {
    // Assuming other form fields are available in req.body
    const {productName, productDescription, price, category} = req.body;

    // Create a new product instance
    const newProduct = new Product({
      productName,
      productDescription,
      price,
      category,
    });
    // Attach images to the new product instance
    if (req.files && req.files.length > 0) {
      newProduct.productImage = req.files.map((file,index) => ({
        data: file.buffer,
        contentType: file.mimetype,
        name: file.originalname,
      }));
    }

    // Save the new product to the database
    await newProduct.save();

    return res.status(201).json({success: true, message: "Product created successfully"});
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({error: "Internal Server Error"});
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const data = await Product.aggregate([
      {$match: {category: {$exists: true, $ne: null}}},
      {
        $group: {
          _id: "$category",
          documents: {$addToSet: "$$ROOT"},
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          documents: 1,
        },
      },
    ]);
    return res.status(200).send({success: true, data: data});
  } catch (e) {
    return res.status(400).send({success: false, message: e});
  }
};



export const getProductBySeller = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.find({createdBy:id});
    if (data) {
      return res.status(200).send({success: true, data: data});
    } else {
      return res.status(200).send({success: false, data: "Item not found"});
    }
  } catch (e) {
    return res.status(400).send({success: false, message: e});
  }
};

export const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findById(id);
    if (data) {
      return res.status(200).send({success: true, data: data});
    } else {
      return res.status(200).send({success: false, data: "Item not found"});
    }
  } catch (e) {
    return res.status(400).send({success: false, message: e});
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updateData = req.body; 
  try {
    // Find the product by ID
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update fields other than productImage
    existingProduct.productName = updateData.productName;
    existingProduct.productDescription = updateData.productDescription;
    existingProduct.price = updateData.price;
    existingProduct.category = updateData.category;

// Handle deletion of images based on _id array
if (updateData.deletedImageIds) {
  try {
    const parsedDeletedImageIds = JSON.parse(updateData.deletedImageIds);
    if (Array.isArray(parsedDeletedImageIds)) {
      for(const deletedImageId of parsedDeletedImageIds){
        // Find the image by _id
        const deletedImage = existingProduct.productImage.find(image => image._id.toString() === deletedImageId);
        
        if (deletedImage) {
          // Remove the file from the 'uploads' folder
          const filePath = `uploads/${deletedImage.name}`;
          console.log(deletedImage,filePath,'PPPPPPPPPPPPPPPPP')
          try {
            await fsPromises.unlink(filePath);
          } catch (error) {
            console.error(`Error deleting file: ${filePath}`, error);
          }

          // Filter out the image with the specified _id
          console.log(existingProduct.productImage,'EXIST')
          existingProduct.productImage = existingProduct.productImage.filter(image => image._id.toString() !== deletedImageId);
        }
      };
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Error parsing deletedImageIds: Invalid JSON format');
    } else {
      console.error('Error parsing deletedImageIds:', error);
    }
    // Handle the error as needed
  }
}

    // Handle productImage updates
    if (req.files && req.files.length > 0) {
      req.files.forEach((updatedFile, index) => {
        const indexInProductImageArray = parseInt(updatedFile.fieldname.split('[')[1].split(']')[0], 10);

        const existingImage = existingProduct.productImage[indexInProductImageArray];

        // If the index exists in the existing product's images, replace it
        if (existingImage) {
          existingImage.data = updatedFile.buffer;
          existingImage.contentType = updatedFile.mimetype;
          existingImage.name =  updatedFile.originalname;
        } else {
          // If the index doesn't exist, add it to the images array
          existingProduct.productImage[indexInProductImageArray] = {
            data: updatedFile.buffer,
            contentType: updatedFile.mimetype,
            name:  updatedFile.originalname,
          };
        }
      });
    }



    // Save the updated product to the database
    const updatedProduct = await existingProduct.save();

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
