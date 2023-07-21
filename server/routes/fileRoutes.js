import { Router } from "express";
import {
    getFile,
} from "../controllers/fileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router(); 

router.route("/:id").get(getFile);


export default router;
