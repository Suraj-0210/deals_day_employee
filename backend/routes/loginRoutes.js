import express from "express";
import {
  signup,
  login,
  getAllAdmins,
  getAdminByUsername,
  logout,
} from "../controllers/LoginController.js";

const router = express.Router();

// Route to create a new login entry
router.post("/signup", signup);

// Route to create a new login entry
router.post("/login", login);

// Route to log out a user
router.post("/logout", logout); // Add logout route

// Route to get all login entries
router.get("/", getAllAdmins);

// Route to get a login entry by Username
router.get("/:username", getAdminByUsername);

export default router;
