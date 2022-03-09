const asynchandler = require("express-async-handler");
const Post = require("../models/postModel");

// Basic permission routes
// @desc Get posts
// @route GET /api/goals
// @access Public
const getPosts = asynchandler(async (req, res) => {
  var page = parseInt(req.query.page) || 0;
  var limit = parseInt(req.query.limit) || 20;
  var skip = page * Math.min(limit, 40);

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  res
    .status(200)
    .json({ posts: posts, page: page, limit: limit, pageSize: posts.length });
});

// @desc Get post
// @route GET /api/goals/:id
// @access Public
const getPost = asynchandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json({ post });
});

// Protected routes
// @desc Create post
// @route POST /api/goals/
// @access Private
const createPost = asynchandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  if (!req.admin) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  const post = await Post.create({ ...req.body, admin: req.admin._id });
  res.status(201).json({ post });
});

// @desc Delete post
// @route DELETE /api/goals/:id
// @access Private
const deletePost = asynchandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }
  if (!req.admin) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  if (post.admin.toString() !== req.admin._id.toString()) {
    res.status(401).json({ msg: "Unauthorized" });
  }
  await Post.deleteOne({ _id: req.params.id });
  res.status(200).json({ _id: post._id });
});

// @desc Update post
// @route PUT /api/goals/:id
// @access Private
const updatePost = asynchandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }
  if (!req.admin) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  if (post.admin.toString() !== req.admin._id.toString()) {
    res.status(401).json({ msg: "Unauthorized" });
  }
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updated);
});

// @desc Delete all posts (only in development)
// @route DELETE /api/goals/
// @access Public
const deleteAll = asynchandler(async (req, res) => {
  const posts = await Post.find();
  const ids = posts.map((post) => post._id);
  await Post.deleteMany({ _id: { $in: ids } });

  res.status(200).json({ msg: "All posts deleted" });
});

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  deleteAll,
};
