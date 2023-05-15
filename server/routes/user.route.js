import express from "express";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  followUser,
  unfollowUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.put("/follow", verifyToken, followUser);
router.put("/unfollow", verifyToken, unfollowUser);

export default router;
