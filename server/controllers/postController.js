import asyncHandler from "express-async-handler";
import Post from "../models/Post.js"
import User from "../models/User.js";
import jwt from 'jsonwebtoken'


//@route  POST api/posts
//@desc   [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const createPost = asyncHandler(async (req, res) => {

    // probably dont need, validates user
        const decodedToken = jwt.verify(req.headers.authorization.substring(7),"playbooksecret");
        const userId = decodedToken.id;
        
        
        let user = null;
        try { 
            user = User.findById(userId);
            if (!user){
                return res.status(400).json({error: 'user not found'});
            }
        } catch {
            return res.status(500).json({error: 'internal server error'});
        }
    
    var param = req.body;
    param.user = userId;
    if (req.file){
        param.fileId = req.file.id;
    }

    console.log(param);

    try{  
        const newPost = new Post(param); // create an post
        await newPost.save(); // save the post
        return res.status(201).json(newPost); // return 201 and the post created
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'internal server error'});
    }


});

//@route   GET api/posts
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getPosts = asyncHandler(async (req, res) => {
    res.send("hi there");
});

//@route   GET api/posts/:id
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getPost = asyncHandler(async (req, res) => {

}); 

//@route PUT api/posts/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const updatePost = asyncHandler(async (req, res) => {
    
});

//@route DELETE api/posts/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const deletePost = asyncHandler(async (req, res) => {
    
});

export {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
};