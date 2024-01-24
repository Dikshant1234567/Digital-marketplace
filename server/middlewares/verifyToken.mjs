// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const verifyJwt = async (req, res, next) => {
//   let token;
//   // console.log('pro',req.headers.authorization)

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       //decodes token id
//       const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       return res.status(401).send("Not authorized, token failed");
//     }
//   }

//   if (!token) {
//     return res.status(401).send("Not authorized, token failed");
//   }
// };

// module.exports = { verifyJwt };