const express = require('express')
const router = express.Router()
const { getPosts, getPost, createPost, deletePost, updatePost } = require('../controllers/postController')

// Basic permission routes
router.get('/', getPosts)
router.get('/:id', getPost)

// Protected routes
router.post('/', createPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

module.exports = router
