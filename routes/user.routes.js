const express = require("express");
const AuthMiddleware = require("../middleware/auth");
const UserController = require("../controllers/user.controller");
const router = express.Router();
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/disable", UserController.disableUser);
module.exports = router;
