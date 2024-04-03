const express = require("express");
const BlogController = require("../controllers/blog.controller");
const router = express.Router();
const AuthMiddleware = require("../middleware/auth");


//GET ALL POSTS
router.get("/getblogs", BlogController.getAllBlog);
router.get("/getblog/:id", BlogController.getBlog);

//CREATE A POST AND DELETE
router.post("/create", BlogController.createBlog);
router.delete("/delete/:id", BlogController.deleteBlog);

module.exports = router;
