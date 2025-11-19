const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogController');
const blogController = new BlogController();

// Route to get all blog posts
router.get('/', (req, res) => blogController.getAllPosts(req, res));

// Route to get a specific blog post by ID
router.get('/:id', (req, res) => blogController.getPostById(req, res));

module.exports = router;