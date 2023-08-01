import { Router } from "express";
import {
  createTournament,
  addParticipantToTeam,
  leaveTournament,
} from "../controllers/tournamentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/:id")
  .post(protect, addParticipantToTeam)
  .delete(protect, leaveTournament);
router.route("/").post(protect, createTournament);

export default router;
