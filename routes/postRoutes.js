const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  deleteAll
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

// Basic permission routes
router.get("/", getPosts);
router.get("/:id", getPost);
router.delete('/', deleteAll)

// Protected routes
router.post("/", protect, createPost);
router.delete("/:id", protect, deletePost);
router.put("/:id", protect, updatePost);

module.exports = router;
