import express from "express";
import { createProduct, getAllProducts, getSingleProduct } from "../controllers/productController.mjs";
import { upload } from "../util/utils.mjs";

export const productRoutes = express.Router();

productRoutes.post("/create", upload.any("productImage") , createProduct);
productRoutes.get("/allproducts", getAllProducts);
productRoutes.get("/:id", getSingleProduct);




