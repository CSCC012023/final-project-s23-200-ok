import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

//temp removable
import mongoose from "mongoose";
import { gridBucket, gfs } from "../server.js";

//@route   GET api/files/:id
//@desc    TODO: Get all posts created by logged in user or their friends, all posts for now
//@access  Private
const getFile = asyncHandler(async (req, res) => {
  // Check for user (set in authentication middleware)
//   if (!req.user) {
//     res.status(400);
//     throw new Error("Invalid user");
//   }

  console.log(req.params.id);

  try{
      let fileid = req.params.id;

    let id = new mongoose.Types.ObjectId(fileid);

    let a = await gridBucket.find({ _id: id });
    let b = await a.toArray((error, files) => {
        if (error) {
          return console.error('Error! ', error);
        }
      });
    const readStream = gridBucket.openDownloadStream(id);
    readStream.pipe(res);

  } catch (e){
      return res.status(400).send(e.message);
  }
});



export {
    getFile,
};
