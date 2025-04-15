const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const userAuthMiddleWare = require("../middleware/userAuthMiddleware");

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);
router.get("/profile", userAuthMiddleWare, userController.getProfile);
router.get("/events", userController.getEvents);

router.get(
  "/event-details/:id",
  userAuthMiddleWare,
  userController.eventDetails
);

router.get(
  "/registered-events",
  userAuthMiddleWare,
  userController.registeredEvents
);

router.post(
  "/register-event/:id",
  userAuthMiddleWare,
  userController.registerEvent
);
module.exports = router;
