import express from "express";
const { register, loginWithEmail } = require('../controllers/authController')

const router = express.Router();

router.post("/register", register);
router.post("/login", loginWithEmail);

module.exports = router
