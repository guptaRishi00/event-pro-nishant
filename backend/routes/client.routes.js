const express = require("express");
const router = express.Router();
const {
  clientRegister,
  postEvents,
} = require("../controllers/client.controller");

const upload = require("../middleware/multer.middleware");
const { getEvents } = require("../controllers/user.controller");

router.post("/register", clientRegister);

router.post("/post-event", upload.single("picture"), postEvents);

module.exports = router;
