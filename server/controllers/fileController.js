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

  console.log(10);

  console.log(req.params.id);
  // gfs.
  try{
      // var items = await gfs.find()
      // console.log(items);
      // items.toArray((err,files) => {
      //     if (!files || files.length === 0){
      //         console.log("200 good");

      //         return res.status(200).json({
      //             success: false,
      //             message: "no files found"
      //         });
      //     }

      //     console.log("checkpoint");
      //     files.map(file => {
      //         if (file.contentType === 'image/jpg' ||
      //             file.contentType === 'image/png' ||
      //             file.contentType === 'image/jpeg'){
      //                 file.isImage = true;
      //         } else{
      //             file.isImage = false;
      //         }
      //     })

      //     console.log("200 good");
      //     console.log(files);
      //     res.status(200).json({
      //         success: true,
      //         files
      //     })
      // })
      let fileid = req.params.id;
      console.log(1)
    //   console.log(gridBucket);
    //   var readstream = gfs.createReadStream({_id:fileid});
    //   readstream.pipe(res);

    let id = new mongoose.Types.ObjectId(fileid);

    let a = await gridBucket.find({ _id: id });
    let b = await a.toArray((error, files) => {
        if (error) {
          return console.error('Error! ', error);
        }
        console.log(1.25);
        console.log('Files: ', files);
      });
    console.log(a);
    console.log("here is b");
    console.log(b);

    
    const readStream = gridBucket.openDownloadStream(id);
    console.log(1.5);
    readStream.pipe(res);

    //   let file = await gridBucket.chunks.find({fileName: fileid});
    //   console.log(file);
      console.log(2);
    //   file.toArray(
    //       (err, result)=> {
    //           if (err){
    //               console.log(1);
    //               return res.status(400).send(err.message)
    //           }
    //           else{
    //               if (!result || result.length==0){
    //                   console.log(2);
    //                   return res.status(201).send("File does not exists")
    //               }
    //               else {
    //                   // gridBucket.openDownloadStream(ObjectId(fileid)).pipe(res)
    //                   gridBucket.openDownloadStreamByName(fileid).pipe(res)
                      
    //               }
    //           }
    //       }
    //   )
    // return res.status(200).send();
      console.log(3);


  } catch (e){
      return res.status(400).send(e.message);
  }
//   const posts = await Post.find({});
//   for (let ind in posts){
//     console.log(posts[ind].file);
//     let fid = posts
//   }
  // res.status(200).json(posts);
});

//@route   GET api/files/:id
//@desc    TODO: Get all posts created by logged in user or their friends, all posts for now
//@access  Private
// const getFile = asyncHandler(async (req, res) => {
//   // Check for user (set in authentication middleware)
// //   if (!req.user) {
// //     res.status(400);
// //     throw new Error("Invalid user");
// //   }

//   console.log(10);

//   console.log(req.params.id);
//   // gfs.
//   try{
//       // var items = await gfs.find()
//       // console.log(items);
//       // items.toArray((err,files) => {
//       //     if (!files || files.length === 0){
//       //         console.log("200 good");

//       //         return res.status(200).json({
//       //             success: false,
//       //             message: "no files found"
//       //         });
//       //     }

//       //     console.log("checkpoint");
//       //     files.map(file => {
//       //         if (file.contentType === 'image/jpg' ||
//       //             file.contentType === 'image/png' ||
//       //             file.contentType === 'image/jpeg'){
//       //                 file.isImage = true;
//       //         } else{
//       //             file.isImage = false;
//       //         }
//       //     })

//       //     console.log("200 good");
//       //     console.log(files);
//       //     res.status(200).json({
//       //         success: true,
//       //         files
//       //     })
//       // })
//       let fileid = req.params.id;
//       console.log(1)
//       console.log(gridBucket);
//       let file = await gridBucket.chunks.find({fileName: fileid});
//       console.log(file);
//       console.log(2);
//     //   file.toArray(
//     //       (err, result)=> {
//     //           if (err){
//     //               console.log(1);
//     //               return res.status(400).send(err.message)
//     //           }
//     //           else{
//     //               if (!result || result.length==0){
//     //                   console.log(2);
//     //                   return res.status(201).send("File does not exists")
//     //               }
//     //               else {
//     //                   // gridBucket.openDownloadStream(ObjectId(fileid)).pipe(res)
//     //                   gridBucket.openDownloadStreamByName(fileid).pipe(res)
                      
//     //               }
//     //           }
//     //       }
//     //   )
//     return res.status(200).json(file);
//       console.log(3);


//   } catch (e){
//       return res.status(400).send(e.message);
//   }
// //   const posts = await Post.find({});
// //   for (let ind in posts){
// //     console.log(posts[ind].file);
// //     let fid = posts
// //   }
//   // res.status(200).json(posts);
// });



//@route   GET api/posts/:id
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getPost = asyncHandler(async (req, res) => {});

//@route PUT api/posts/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const updatePost = asyncHandler(async (req, res) => {});

//@route DELETE api/posts/:id
//@desc  delete post
//@access private 
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    // the user is authorized to delete it. 
    if (post) {
      await post.deleteOne({ _id: req.params.id });
      res.json({ "_id": req.params.id });
    } else { // post not available
      res.status(404);
      throw new Error("Post not found");

    }
    
});

//@route   PATCH api/posts/:id/react
//@desc    Add a like to the post
//@access  Private
const reactToPost = asyncHandler(async (req, res) => {
  try {
    const { reaction } = req.body; // Taking reaction type from the request body
    const user = req.user.id;
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    // Gettting the index of the reaction to update
    const reactionIndex = post.likes.findIndex(like => like.user.toString() === user);

    if (reactionIndex === -1) {
      // If the user has not reacted to the post before, add reaction
      post.likes.unshift({ user, reaction });
    } else {
      if (reaction === post.likes[reactionIndex].reaction) {
        // If the user clicked the same reaction again, remove reaction
        post.likes.splice(reactionIndex, 1);
      } else {
        // If the user clicked a different reaction, change reaction
        post.likes[reactionIndex].reaction = reaction;
      }
    }
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Error while liking post");
  }
});

export {
    getFile,
};
