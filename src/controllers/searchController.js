const Recipe = require('../models/Recipe');

class SearchController {
    async searchRecipes(req, res) {
        try {
            const query = req.query.q || '';
            let recipes = [];

            if (query.trim()) {
                recipes = await Recipe.find({
                    $or: [
                        { name: { $regex: query, $options: 'i' } },
                        { description: { $regex: query, $options: 'i' } },
                        { cuisine: { $regex: query, $options: 'i' } }
                    ]
                }).sort({ createdAt: -1 });
            }

            res.render('search', { recipes, query });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error searching recipes' });
        }
    }
}

module.exports = SearchController;