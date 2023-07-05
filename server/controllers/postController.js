import asyncHandler from "express-async-handler";

//@route  POST api/posts
//@desc   [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const createPost = asyncHandler(async (req, res) => {
    
});

//@route   GET api/posts
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getPosts = asyncHandler(async (req, res) => {

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

//@route   PATCH api/posts/:id/like
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const likePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = req.user.id;
    
    // Check if post was already liked by user
    if (post.likes.includes(user)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route   PATCH api/posts/:id/unlike
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const unlikePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = req.user.id;
    // Get index of like to remove
    const likedIndex = post.likes.findIndex(like => like.user.toString() === user);
    
    if (likedIndex === -1) {
      return res.status(400).json({ msg: 'Post not previously liked' });
    }
    post.likes.splice(likedIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost
};
