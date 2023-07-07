import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token, all attributes EXCEPT hashed password
      req.user = await User.findById(decoded.id).select("-password");

      // Call the next piece of middleware
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

export { protect };
