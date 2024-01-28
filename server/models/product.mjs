import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  productImage: [{
      data: Buffer,
      contentType: String,
      name:String
  }],
  uploadTime: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    // required:true, //TODO : make it required later once frontend is done
    ref:"User"  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;