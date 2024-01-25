// const User = require("../models/auth");
import bcrypt from 'bcryptjs'
// import Auth from '../models/auth'
import User from '../models/auth.mjs'
import Jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { userName, email, password, isAdmin } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).send({message:'Please enter all fields', success:false})
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(200).send({message:"User already Exists", success:false});
    // throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(5); //complexity of salt generation
  const hashpassword = await bcrypt.hash(req.body.password, salt); // password hashing

  const user = await User.create({
    email: req.body.email.toLowerCase(),
    password: hashpassword,
    userName:req.body.userName,
    isAdmin:req.body.isAdmin
  });

  try {
    await user.save();
   return res.status(200).send({ message: "User created successfully", success:true });
  } catch (error) {
 return   res.status(404).send("Some Error Occured");
  }
};

export const authLogin = async (req, res) => {
  const loggedUser = await User.findOne({
    email: req.body.email.toLowerCase(),
  });

  if (!loggedUser) {
    return res.status(200).send({message:"Email doesn't exist",success:false});
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    loggedUser.password
  );

  if (!validPassword) {
    return res.status(404).send({message:"Password doesn't match",success:false});
  }

  // if (loggedUser.token !== null) {
  //   return res.send("You are already logged in");
  // }

  //Create token

  const token = Jwt.sign(
    { id: loggedUser._id, role: loggedUser.role },
    process.env.TOKEN_SECRET
  );

  await User.findOneAndUpdate({ _id: loggedUser._id }, { token: token });

  return res.status(200).send({ token: token, isAdmin: loggedUser.isAdmin,success:true });
};