const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    mealType: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert'],
        default: 'Lunch'
    },
    servings: {
        type: Number,
        required: true
    },
    cookTime: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    ingredients: [{
        item: String,
        quantity: String,
        unit: String
    }],
    instructions: [{
        step: Number,
        description: String
    }],
    image: {
        type: String,
        default: 'https://via.placeholder.com/400x300?text=Recipe+Image'
    },
    ratings: [{
        score: {
            type: Number,
            min: 1,
            max: 5,
            default: 5
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Virtual for average rating
recipeSchema.virtual('averageRating').get(function() {
    if (this.ratings.length === 0) return 0;
    const sum = this.ratings.reduce((acc, rating) => acc + rating.score, 0);
    return (sum / this.ratings.length).toFixed(1);
});

module.exports = mongoose.model('Recipe', recipeSchema);