const express = require("express");
const router = express.Router();
const {
  clientRegister,
  postEvents,
  yourEvents,
} = require("../controllers/client.controller");

const middleware = require("../middleware/userAuthMiddleware");

const upload = require("../middleware/multer.middleware");
const { getEvents, eventDetails } = require("../controllers/user.controller");

router.post("/register", clientRegister);

router.post("/post-event", middleware, upload.single("picture"), postEvents);

router.get("/your-events", middleware, yourEvents);

module.exports = router;
