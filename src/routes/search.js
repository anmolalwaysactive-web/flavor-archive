const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/searchController');
const searchController = new SearchController();

router.get('/', (req, res) => {
    searchController.searchRecipes(req, res);
});

module.exports = router;