import express from "express";
import {
  addShow,
  getNowPlayingMovies,
  getUpcomingMovies,
  getShow,
  getShows,
} from "../controller/showController.js";
import { protectAdmin } from "../middleware/auth.js";

const showRouter = express.Router();


showRouter.get("/now-playing", protectAdmin, getNowPlayingMovies);
showRouter.get("/upcoming", getUpcomingMovies);
showRouter.post("/add", protectAdmin, addShow);
showRouter.get("/all", getShows);
showRouter.get("/:movieId", getShow);


export default showRouter;