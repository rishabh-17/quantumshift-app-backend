const express = require("express");
const SectionController = require("../controllers/section.controller");
const router = express.Router();
const AuthMiddleware = require("../middleware/auth");

// const BlogController = require("../controllersr");

//GET ALL POSTS
router.get("/get", SectionController.getAll);
router.get("/get/:id", SectionController.get);

//CREATE A POST
router.post("/create", SectionController.create);
router.delete("/delete/:id", SectionController.delete);

module.exports = router;
