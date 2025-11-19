require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const BlogPost = require('../models/BlogPost');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flavor-archive';

const seedRecipes = [
    {
        name: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper. This creamy and delicious dish is simple to prepare but packed with flavor.',
        cuisine: 'Italian',
        mealType: 'Lunch',
        servings: 4,
        cookTime: '20 minutes',
        difficulty: 'Easy',
        ingredients: [
            { item: 'Spaghetti', quantity: '400', unit: 'grams' },
            { item: 'Pancetta', quantity: '200', unit: 'grams' },
            { item: 'Eggs', quantity: '4', unit: 'whole' },
            { item: 'Parmesan Cheese', quantity: '100', unit: 'grams' },
            { item: 'Black Pepper', quantity: '1', unit: 'teaspoon' },
            { item: 'Salt', quantity: '1', unit: 'pinch' }
        ],
        instructions: [
            { step: 1, description: 'Cook spaghetti in salted boiling water until al dente.' },
            { step: 2, description: 'Cut pancetta into small pieces and cook in a pan until crispy.' },
            { step: 3, description: 'Beat eggs with grated Parmesan cheese and black pepper.' },
            { step: 4, description: 'Drain pasta and mix with pancetta and its fat.' },
            { step: 5, description: 'Remove from heat and add egg mixture, stirring constantly.' },
            { step: 6, description: 'Serve immediately with extra Parmesan cheese.' }
        ],
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
        ratings: [
            { score: 5 },
            { score: 4 },
            { score: 5 }
        ]
    },
    {
        name: 'Pad Thai',
        description: 'A popular Thai street food made with rice noodles, shrimp or chicken, peanuts, and lime. Perfectly balanced with sweet, sour, and spicy flavors.',
        cuisine: 'Thai',
        mealType: 'Dinner',
        servings: 4,
        cookTime: '25 minutes',
        difficulty: 'Medium',
        ingredients: [
            { item: 'Rice Noodles', quantity: '300', unit: 'grams' },
            { item: 'Shrimp', quantity: '300', unit: 'grams' },
            { item: 'Eggs', quantity: '2', unit: 'whole' },
            { item: 'Bean Sprouts', quantity: '2', unit: 'cups' },
            { item: 'Green Onions', quantity: '4', unit: 'stalks' },
            { item: 'Peanuts', quantity: '100', unit: 'grams' },
            { item: 'Lime', quantity: '1', unit: 'whole' },
            { item: 'Fish Sauce', quantity: '3', unit: 'tablespoons' }
        ],
        instructions: [
            { step: 1, description: 'Soak rice noodles in water for 30 minutes until soft.' },
            { step: 2, description: 'Heat oil in a wok and cook shrimp until pink.' },
            { step: 3, description: 'Push shrimp to the side and scramble eggs in the wok.' },
            { step: 4, description: 'Add drained noodles and stir-fry with fish sauce.' },
            { step: 5, description: 'Add bean sprouts and green onions, toss well.' },
            { step: 6, description: 'Serve topped with crushed peanuts and lime wedges.' }
        ],
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
        ratings: [
            { score: 4 },
            { score: 5 },
            { score: 4 },
            { score: 5 }
        ]
    },
    {
        name: 'Chocolate Chip Cookies',
        description: 'Classic American cookies loaded with chocolate chips. Chewy on the inside with slightly crispy edges - perfect for any occasion!',
        cuisine: 'American',
        mealType: 'Dessert',
        servings: 24,
        cookTime: '15 minutes',
        difficulty: 'Easy',
        ingredients: [
            { item: 'All-Purpose Flour', quantity: '2.25', unit: 'cups' },
            { item: 'Butter', quantity: '227', unit: 'grams' },
            { item: 'Brown Sugar', quantity: '200', unit: 'grams' },
            { item: 'White Sugar', quantity: '100', unit: 'grams' },
            { item: 'Eggs', quantity: '2', unit: 'whole' },
            { item: 'Vanilla Extract', quantity: '1', unit: 'teaspoon' },
            { item: 'Baking Soda', quantity: '1', unit: 'teaspoon' },
            { item: 'Chocolate Chips', quantity: '340', unit: 'grams' },
            { item: 'Salt', quantity: '1', unit: 'teaspoon' }
        ],
        instructions: [
            { step: 1, description: 'Preheat oven to 375°F (190°C).' },
            { step: 2, description: 'Cream together butter and sugars until fluffy.' },
            { step: 3, description: 'Beat in eggs and vanilla extract.' },
            { step: 4, description: 'Mix flour, baking soda, and salt in a separate bowl.' },
            { step: 5, description: 'Combine wet and dry ingredients.' },
            { step: 6, description: 'Fold in chocolate chips.' },
            { step: 7, description: 'Drop spoonfuls on baking sheet and bake for 9-12 minutes.' }
        ],
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop',
        ratings: [
            { score: 5 },
            { score: 5 },
            { score: 4 }
        ]
    },
    {
        name: 'Caesar Salad',
        description: 'A fresh and crispy salad with romaine lettuce, Parmesan cheese, and homemade Caesar dressing. A timeless classic that\'s both healthy and delicious.',
        cuisine: 'Italian-American',
        mealType: 'Lunch',
        servings: 2,
        cookTime: '15 minutes',
        difficulty: 'Easy',
        ingredients: [
            { item: 'Romaine Lettuce', quantity: '1', unit: 'head' },
            { item: 'Parmesan Cheese', quantity: '100', unit: 'grams' },
            { item: 'Croutons', quantity: '100', unit: 'grams' },
            { item: 'Anchovy Fillets', quantity: '4', unit: 'pieces' },
            { item: 'Garlic', quantity: '2', unit: 'cloves' },
            { item: 'Lemon Juice', quantity: '2', unit: 'tablespoons' },
            { item: 'Mayonnaise', quantity: '100', unit: 'grams' },
            { item: 'Olive Oil', quantity: '3', unit: 'tablespoons' },
            { item: 'Black Pepper', quantity: '1', unit: 'teaspoon' }
        ],
        instructions: [
            { step: 1, description: 'Wash and chop romaine lettuce into bite-sized pieces.' },
            { step: 2, description: 'Mash anchovies and garlic into a paste.' },
            { step: 3, description: 'Mix mayo, anchovy paste, lemon juice, and olive oil.' },
            { step: 4, description: 'Toss lettuce with dressing.' },
            { step: 5, description: 'Top with croutons and shaved Parmesan cheese.' },
            { step: 6, description: 'Season with black pepper and serve immediately.' }
        ],
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        ratings: [
            { score: 4 },
            { score: 4 },
            { score: 5 }
        ]
    }
];

const seedBlogPosts = [
    {
        title: '10 Tips for Perfect Home Cooking',
        content: 'Cooking at home can be challenging, but with these 10 essential tips, you\'ll be creating delicious meals in no time!\n\n1. Read the recipe thoroughly before starting\n2. Prepare all ingredients before cooking (mise en place)\n3. Invest in quality cookware\n4. Use fresh ingredients whenever possible\n5. Don\'t overcrowd the pan\n6. Taste as you cook\n7. Let meat rest before serving\n8. Season gradually, not all at once\n9. Keep your kitchen clean and organized\n10. Practice and have fun!\n\nRemember, cooking is both an art and a science. The more you practice, the better you\'ll become. Start with simple recipes and gradually work your way up to more complex dishes.',
        author: 'Chef Maria',
        tags: ['Cooking Tips', 'Beginner-Friendly', 'Kitchen Advice'],
        image: 'https://images.unsplash.com/photo-1556910103-2b02b5b8171b?w=400&h=300&fit=crop'
    },
    {
        title: 'The Art of Meal Planning',
        content: 'Meal planning is a crucial skill for maintaining a healthy diet and saving time in the kitchen. Here are some tips to get started:\n\nWhy Meal Plan?\n- Saves time on daily cooking decisions\n- Reduces food waste\n- Helps maintain a balanced diet\n- Saves money on groceries\n- Reduces stress during busy weekdays\n\nHow to Start:\n1. Choose a planning day (usually Sunday)\n2. Check your calendar for busy days\n3. Plan simple meals for busy days\n4. Create a shopping list\n5. Shop once a week\n6. Prep ingredients when you get home\n\nWith consistent meal planning, you\'ll find that cooking becomes more efficient and enjoyable. Start small with planning just a few days at a time, and gradually build up to full-week planning.',
        author: 'Chef Marco',
        tags: ['Meal Planning', 'Time Management', 'Healthy Eating'],
        image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop'
    },
    {
        title: 'Mastering Knife Skills in the Kitchen',
        content: 'Knife skills are fundamental to every home cook. Learning proper techniques will not only make you more efficient but also safer in the kitchen.\n\nBasic Knife Techniques:\n- The Claw Grip: Protect your fingers when cutting\n- The Rock Motion: Keep the knife tip on the board\n- Julienne: Cut vegetables into thin strips\n- Brunoise: Dice vegetables into small cubes\n- Chiffonade: Slice leafy vegetables into ribbons\n\nEssential Knives:\n1. Chef\'s Knife (8-10 inches) - Your most important tool\n2. Paring Knife (3-4 inches) - For detailed work\n3. Serrated Bread Knife - For slicing bread and tomatoes\n4. Boning Knife - For removing bones from meat\n\nMaintenance Tips:\n- Keep your knives sharp with regular honing\n- Use a proper cutting board (wood or plastic, not glass)\n- Wash by hand and dry immediately\n- Store safely in a knife block or on a magnetic strip\n\nInvesting time in learning proper knife skills will elevate your cooking and make meal preparation more enjoyable. Start with the chef\'s knife and practice regularly!',
        author: 'Chef James',
        tags: ['Knife Skills', 'Technique', 'Kitchen Basics'],
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    },
    {
        title: 'Herbs and Spices: Flavor Your Cooking',
        content: 'Herbs and spices are the backbone of flavorful cooking. Understanding how to use them properly can transform ordinary dishes into extraordinary meals.\n\nFresh Herbs:\n- Basil: Perfect for Italian cuisine and pesto\n- Parsley: Versatile herb for garnish and flavor\n- Cilantro: Essential in Mexican and Asian cooking\n- Thyme: Great for roasted vegetables and meats\n- Rosemary: Pairs well with lamb and potatoes\n- Dill: Ideal for fish and salads\n\nEssential Dried Spices:\n1. Cumin - Earthy and warm\n2. Paprika - Mild and sweet or smoky\n3. Garlic Powder - Convenient and versatile\n4. Chili Powder - Adds heat and depth\n5. Cinnamon - Sweet and aromatic\n6. Black Pepper - Essential seasoning\n\nStorage Tips:\n- Store in cool, dark places away from sunlight\n- Use airtight containers\n- Replace dried herbs every 6-12 months\n- Fresh herbs last 1-2 weeks when properly stored\n\nCooking Tips:\n- Add fresh herbs at the end of cooking\n- Toast dried spices before using for enhanced flavor\n- Taste as you season\n- Start with small amounts and adjust\n\nWith proper use of herbs and spices, you\'ll never need to depend on salt or unhealthy flavor enhancers again!',
        author: 'Chef Sophie',
        tags: ['Herbs and Spices', 'Flavoring', 'Seasoning'],
        image: 'https://images.unsplash.com/photo-1596040608233-d7530a8ce1f7?w=400&h=300&fit=crop'
    },
    {
        title: 'Healthy Eating: Nutrition Tips for Foodies',
        content: 'You don\'t have to choose between delicious food and healthy eating. Here are strategies to enjoy flavorful meals while maintaining a nutritious diet.\n\nBalanced Plate Approach:\n- 50% vegetables and fruits\n- 25% whole grains\n- 25% lean proteins\n- Healthy fats from oils, nuts, and fish\n\nSmart Cooking Methods:\n1. Grilling - Reduces added fats\n2. Steaming - Preserves nutrients\n3. Roasting - Brings out natural flavors\n4. Stir-frying - Quick and retains vitamins\n5. Boiling - Use the cooking water for soups\n\nNutrition Tips:\n- Choose whole grains over refined\n- Include fiber-rich vegetables and legumes\n- Opt for lean proteins (fish, chicken, beans)\n- Use herbs instead of salt for flavor\n- Drink plenty of water\n- Practice portion control\n- Limit processed foods\n- Read food labels\n\nHealthy Recipe Ideas:\n- Buddha bowls with mixed vegetables and proteins\n- Grilled fish with roasted vegetables\n- Legume-based soups and stews\n- Vegetable stir-fries with lean meats\n- Whole grain pasta with fresh sauces\n\nRemember, healthy eating is a lifestyle, not a restriction. Focus on enjoying fresh, whole foods prepared with love!',
        author: 'Chef David',
        tags: ['Healthy Eating', 'Nutrition', 'Wellness'],
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop'
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Clear existing data
        await Recipe.deleteMany({});
        await BlogPost.deleteMany({});

        // Insert seed data
        const recipes = await Recipe.insertMany(seedRecipes);
        console.log(`✓ Inserted ${recipes.length} recipes`);

        const posts = await BlogPost.insertMany(seedBlogPosts);
        console.log(`✓ Inserted ${posts.length} blog posts`);

        console.log('\n✓ Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();