import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  reactToPost
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import { postFileUpload }from "../middleware/fileMiddleware.js"

const router = Router(); 

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f305e94 (video retrieve done, finally)
router.route("/")
    .post(protect, postFileUpload().single('PostFile'), createPost)
    .get(
      protect, 
<<<<<<< HEAD
<<<<<<< HEAD
      getPosts);
=======
router.route("/").post(protect, postFileUpload().single('PostFile'), createPost).get(protect, getPosts);
>>>>>>> f6dc35d (prep for backend file)
=======
      postFileRetrieveAll, 
=======
>>>>>>> e369e78 (connect frontned with video stream)
      getPosts);
>>>>>>> f305e94 (video retrieve done, finally)
router.route("/:id/react").patch(protect, reactToPost);
router.route("/:id").delete(protect, deletePost);
// router
//   .route("/:id")
//   .get(protect, getPost)
//   .put(protect, updatePost)
//   .delete(protect, deletePost);

export default router;
