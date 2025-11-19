const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const BlogPost = require('../models/BlogPost');

// Route for the homepage
router.get('/', async (req, res) => {
    try {
        // Fetch featured recipes (top rated)
        const recipes = await Recipe.find().sort({ averageRating: -1 }).limit(3);
        
        // Fetch latest blog posts
        const posts = await BlogPost.find().sort({ createdAt: -1 }).limit(2);
        
        res.render('home', { title: 'Flavor Archive', recipes, posts });
    } catch (err) {
        console.error(err);
        res.render('home', { title: 'Flavor Archive', recipes: [], posts: [] });
    }
});

module.exports = router;