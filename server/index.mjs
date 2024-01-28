import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import {authRoutes} from './routes/authRoute.mjs'
import { productRoutes } from "./routes/productRoute.mjs";
import Product from "./models/product.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.ATLAS_URI)
  .then((e) => console.log("CONNECTED TO SERVER"));

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.use("/auth", authRoutes);
app.use("/product", productRoutes);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});
