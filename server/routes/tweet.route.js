import express from "express";

import { verifyToken } from "../verifyToken.js";
import {
  createTweet,
  deleteTweet,
  likeOrDislike,
  getUserTimeline,
  getUserTweets,
  getExploreTweets,
} from "../controllers/tweet.controller.js";

const router = express.Router();

router.post("/", verifyToken, createTweet);
router.delete("/:id", verifyToken, deleteTweet);
router.put("/like", likeOrDislike);
router.get("/timeline/:userId", getUserTimeline);
router.get("/explore", getExploreTweets);
router.get("/:userId", getUserTweets);

export default router;
