import { Router } from "express";
import {
    getFile,
} from "../controllers/fileController.js";
import { protect } from "../middleware/authMiddleware.js";
import { postFileRetrieveAll, postFileRetrieveOne} from "../middleware/fileMiddleware.js"
// import { postFileUpload, postFileRetrieveAll }from "../middleware/fileMiddleware.js"

const router = Router(); 

// router.route("/")
//     .post(protect, postFileUpload().single('PostFile'), createPost)
//     .get(
//       protect, 
//       postFileRetrieveAll, 
//       getPosts);
// router.route("/:id/react").patch(protect, reactToPost);
router.route("/:id").get(
    // protect, 
    // postFileRetrieveOne, 
    getFile
    );
// router
//   .route("/:id")
//   .get(protect, getPost)
//   .put(protect, updatePost)
//   .delete(protect, deletePost);

export default router;
