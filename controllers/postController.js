const asynchandler = require('express-async-handler')
const Post = require('../models/postModel')

// Basic permission routes
// @desc Get posts
// @route GET /api/goals
// @access Public
const getPosts = asynchandler(async (req, res) => {
    const posts = await Post.find();
    res.status(200).json({ posts })
})

// @desc Get post
// @route GET /api/goals/:id
// @access Public
const getPost = asynchandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ post })
})


// Protected routes
// @desc Create post
// @route POST /api/goals/
// @access Private
const createPost = asynchandler(async (req, res) => {
    const post = await Post.create(req.body);
    res.status(201).json({ post })
})

// @desc Delete post
// @route DELETE /api/goals/:id
// @access Private
const deletePost = asynchandler(async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ _id: post._id })
});

// @desc Update post
// @route PUT /api/goals/:id
// @access Privatev
const updatePost = asynchandler(async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ post })
});

module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
}