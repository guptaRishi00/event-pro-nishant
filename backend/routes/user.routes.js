const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { userAuthMiddleWare } = require("../middleware/userAuthMiddleware");

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);
router.get("/profile", userAuthMiddleWare, userController.getProfile);

module.exports = router;
