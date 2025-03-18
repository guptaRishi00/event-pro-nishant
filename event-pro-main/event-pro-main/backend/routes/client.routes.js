const express = require("express");
const router = express.Router();
const { clientRegister } = require("../controllers/client.controller");

router.post("/register", clientRegister);

module.exports = router;
