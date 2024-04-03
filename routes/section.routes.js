const express = require("express");
const SectionController = require("../controllers/section.controller");
const router = express.Router();
const AuthMiddleware = require("../middleware/auth");

// const BlogController = require("../controllersr");

//GET ALL POSTS
router.get("/get", BlogController.getAll);
router.get("/get/:id", BlogController.get);

//CREATE A POST
router.post("/create", BlogController.create);
router.delete("/delete/:id", BlogController.delete);

module.exports = router;
