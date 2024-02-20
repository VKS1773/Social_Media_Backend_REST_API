import express from "express";
import {
  createUser,
  getAllUser,
  loginuser,
} from "../controllers/user-controller";
const router = express.Router();
router.get("/", getAllUser);
router.post("/signup", createUser);
router.post("/login", loginuser);
export default router;
