import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import mongoose from "mongoose";
import posts from "./routes/posts.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.ATLAS_URI)
  .then((e) => console.log("CONNECTED TO SERVER"));

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Load the /posts routes
app.use("/posts", posts);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});
