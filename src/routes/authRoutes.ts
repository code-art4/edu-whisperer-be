import express from "express";
import { loginAsGuest, register, loginWithEmail } from '../controllers/authController';

const router = express.Router();

router.post("/register", register);
router.post("/login", loginWithEmail);
router.post("/guest-login", loginAsGuest);

module.exports = router
