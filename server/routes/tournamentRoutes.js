import { Router } from "express";
import {
  createTournament,
  getTournamentById,
  getAllTournaments,
  updateTournamentById,
  addParticipantToTeam,
  leaveTournament,
} from "../controllers/tournamentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/:id")
  .post(protect, addParticipantToTeam)
  .delete(protect, leaveTournament)
  .patch(protect, updateTournamentById);
router
  .route("/")
  .post(protect, createTournament)
  .get(protect, getAllTournaments);

export default router;
