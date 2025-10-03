const express = require("express");
const router = express.Router();

const { register, login, profile } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

//POST register
router.post("/register", register);

//POST login
router.post("/login", login);

//GET profile
router.get("/profile", authMiddleware, profile);

module.exports = router;
