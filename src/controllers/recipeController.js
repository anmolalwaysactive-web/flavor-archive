const Recipe = require('../models/Recipe');

class RecipeController {
    async getAllRecipes(req, res) {
        try {
            const { mealType, minRating, difficulty } = req.query;
            let filter = {};

            if (mealType && mealType !== 'All') {
                filter.mealType = mealType;
            }
            if (difficulty && difficulty !== 'All') {
                filter.difficulty = difficulty;
            }

            let recipes = await Recipe.find(filter).sort({ createdAt: -1 });

            // Filter by minimum rating if specified
            if (minRating) {
                const minRate = parseFloat(minRating);
                recipes = recipes.filter(recipe => {
                    const avg = parseFloat(recipe.averageRating) || 0;
                    return avg >= minRate;
                });
            }

            res.render('recipes', { recipes, filters: { mealType, minRating, difficulty } });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error fetching recipes' });
        }
    }

    async getRecipeById(req, res) {
        try {
            const recipe = await Recipe.findById(req.params.id);
            if (!recipe) {
                return res.status(404).render('error', { message: 'Recipe not found' });
            }
            res.render('recipeDetail', { recipe });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error fetching recipe' });
        }
    }

    async createRecipe(req, res) {
        try {
            res.render('addRecipe');
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error loading form' });
        }
    }

    async saveRecipe(req, res) {
        try {
            const { name, description, cuisine, mealType, servings, cookTime, difficulty, ingredients, instructions, image, imageUrl } = req.body;

            // Use imageUrl if provided, otherwise use image from gallery, or use a default
            let finalImage = imageUrl || image || 'https://via.placeholder.com/400x300?text=Recipe+Image';

            // Parse ingredients
            let parsedIngredients = [];
            if (typeof ingredients === 'string') {
                parsedIngredients = ingredients.split(',').map(ing => {
                    const parts = ing.trim().split('-');
                    return {
                        item: parts[2]?.trim() || '',
                        quantity: parts[0]?.trim() || '',
                        unit: parts[1]?.trim() || ''
                    };
                });
            }

            // Parse instructions
            let parsedInstructions = [];
            if (typeof instructions === 'string') {
                parsedInstructions = instructions.split(',').map((inst, idx) => ({
                    step: idx + 1,
                    description: inst.trim()
                }));
            }

            const recipe = new Recipe({
                name,
                description,
                cuisine,
                mealType: mealType || 'Lunch',
                servings: parseInt(servings),
                cookTime,
                difficulty,
                ingredients: parsedIngredients,
                instructions: parsedInstructions,
                image: finalImage
            });

            await recipe.save();
            res.redirect('/recipes');
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error saving recipe' });
        }
    }

    async editRecipe(req, res) {
        try {
            const recipe = await Recipe.findById(req.params.id);
            if (!recipe) {
                return res.status(404).render('error', { message: 'Recipe not found' });
            }
            res.render('editRecipe', { recipe });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error loading recipe for editing' });
        }
    }

    async updateRecipe(req, res) {
        try {
            const { name, description, cuisine, mealType, servings, cookTime, difficulty, ingredients, instructions, image, imageUrl } = req.body;
            
            // Use imageUrl if provided, otherwise use image from gallery
            let finalImage = imageUrl || image || 'https://via.placeholder.com/400x300?text=Recipe+Image';

            // Parse ingredients
            let parsedIngredients = [];
            if (typeof ingredients === 'string') {
                parsedIngredients = ingredients.split(',').map(ing => {
                    const parts = ing.trim().split('-');
                    return {
                        item: parts[2]?.trim() || '',
                        quantity: parts[0]?.trim() || '',
                        unit: parts[1]?.trim() || ''
                    };
                });
            }

            // Parse instructions
            let parsedInstructions = [];
            if (typeof instructions === 'string') {
                parsedInstructions = instructions.split(',').map((inst, idx) => ({
                    step: idx + 1,
                    description: inst.trim()
                }));
            }

            await Recipe.findByIdAndUpdate(req.params.id, {
                name,
                description,
                cuisine,
                mealType,
                servings: parseInt(servings),
                cookTime,
                difficulty,
                ingredients: parsedIngredients,
                instructions: parsedInstructions,
                image: finalImage,
                updatedAt: new Date()
            });

            res.redirect(`/recipes/${req.params.id}`);
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error updating recipe' });
        }
    }

    async deleteRecipe(req, res) {
        try {
            await Recipe.findByIdAndDelete(req.params.id);
            res.redirect('/recipes');
        } catch (err) {
            console.error(err);
            res.status(500).render('error', { message: 'Error deleting recipe' });
        }
    }

    async addRating(req, res) {
        try {
            const { score } = req.body;
            const recipe = await Recipe.findById(req.params.id);

            if (!recipe) {
                return res.status(404).json({ error: 'Recipe not found' });
            }

            recipe.ratings.push({ score: parseInt(score) });
            await recipe.save();

            res.json({ success: true, averageRating: recipe.averageRating, count: recipe.ratings.length });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error adding rating' });
        }
    }
}

module.exports = RecipeController;