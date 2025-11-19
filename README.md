# 🍳 Flavor Archive

A full-featured recipe sharing and blog platform built with Node.js, Express, MongoDB, and EJS. Discover, share, and search for delicious recipes from around the world!

## ✨ Features

- **📖 Recipe Archive**: Browse a curated collection of recipes with detailed ingredients and instructions
- **➕ Add Recipes**: Contribute your favorite recipes to the community
- **🔍 Search Functionality**: Powerful search to find recipes by name, cuisine, or description
- **📝 Blog Section**: Read culinary tips, tricks, and food-related articles
- **🎨 Beautiful UI**: Responsive design with modern gradient styling
- **⚡ Fast & Reliable**: Built with Express.js and MongoDB for optimal performance
- **Pre-seeded Data**: Comes with 4 sample recipes and 2 blog posts to get you started

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS Template Engine
- **Styling**: Custom CSS with responsive design
- **Environment Management**: dotenv

## 📁 Project Structure

```
flavor-archive/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── routes/
│   │   ├── home.js           # Home page route
│   │   ├── recipes.js        # Recipe routes (list, detail, add)
│   │   ├── blog.js           # Blog routes
│   │   └── search.js         # Search route
│   ├── controllers/
│   │   ├── recipeController.js    # Recipe logic
│   │   ├── blogController.js      # Blog logic
│   │   └── searchController.js    # Search logic
│   ├── models/
│   │   ├── Recipe.js         # Recipe schema
│   │   └── BlogPost.js       # Blog post schema
│   ├── data/
│   │   └── seedRecipes.js    # Database seeding script
│   └── views/
│       ├── home.ejs
│       ├── recipes.ejs
│       ├── recipeDetail.ejs
│       ├── addRecipe.ejs
│       ├── blog.ejs
│       ├── blogDetail.ejs
│       ├── search.ejs
│       └── error.ejs
├── public/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   └── js/
│       └── script.js         # Client-side functionality
├── .env                       # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v12 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flavor-archive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory (already included):
   ```
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/flavor-archive
   ```

4. **Seed the database** (optional, but recommended)
   ```bash
   npm run seed
   ```
   This will populate the database with 4 sample recipes and 2 blog posts.

5. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📖 Usage Guide

### Browsing Recipes
- Navigate to the **Recipes** page to see all available recipes
- Click on any recipe card to view full details, ingredients, and instructions
- Each recipe includes cooking time, servings, difficulty level, and cuisine type

### Adding a Recipe
1. Click the **Add Recipe** button in the navigation
2. Fill in all recipe details:
   - Recipe name and description
   - Cuisine type
   - Servings and cook time
   - Difficulty level (Easy/Medium/Hard)
   - Ingredients (format: `quantity-unit-item`, comma-separated)
   - Instructions (comma-separated steps)
3. Submit the form to add your recipe

### Searching Recipes
- Use the search bar at the top to search recipes by:
  - Recipe name
  - Cuisine type
  - Description
- Results update in real-time

### Reading the Blog
- Visit the **Blog** section to read articles
- Click on any blog post for the full article
- View tags and author information

## 🗄️ Database Schema

### Recipe Collection
```javascript
{
  name: String,
  description: String,
  cuisine: String,
  servings: Number,
  cookTime: String,
  difficulty: String (Easy/Medium/Hard),
  ingredients: [
    { item: String, quantity: String, unit: String }
  ],
  instructions: [
    { step: Number, description: String }
  ],
  image: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

### BlogPost Collection
```javascript
{
  title: String,
  content: String,
  author: String,
  image: String (URL),
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 API Endpoints

### Routes
- `GET /` - Home page
- `GET /recipes` - All recipes
- `GET /recipes/add` - Add recipe form
- `POST /recipes/add` - Submit new recipe
- `GET /recipes/:id` - Recipe details
- `GET /blog` - Blog posts
- `GET /blog/:id` - Blog post details
- `GET /search?q=<query>` - Search recipes

## 🎨 Customization

### Styling
- Main stylesheet: `public/css/style.css`
- Uses CSS Grid and Flexbox for responsive design
- Color scheme: Purple gradients (#667eea to #764ba2)
- Easily customizable by modifying CSS variables

### Recipe Images
- Currently uses placeholder images from Unsplash
- Replace `image` fields in seedRecipes.js with your own image URLs
- Or modify the seed script to accept image uploads

## 🔐 Security Notes

- This is a demonstration project with educational purposes
- Implement proper authentication for production use
- Add input validation and sanitization
- Use HTTPS for production deployments
- Store sensitive data securely in environment variables

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or update MONGODB_URI in .env
- Check the connection string format

### Port Already in Use
- Change PORT in .env file
- Or kill the process using port 3000

### Seed Data Not Loading
- Verify MongoDB is connected
- Run `npm run seed` after starting the server
- Check console for error messages

## 📝 Future Enhancements

- [ ] User authentication and profiles
- [ ] Recipe ratings and reviews
- [ ] Difficulty filtering
- [ ] Ingredient-based search
- [ ] Nutritional information
- [ ] Recipe categories and tags
- [ ] Social sharing features
- [ ] Email notifications
- [ ] Recipe export (PDF)
- [ ] Mobile app

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or suggestions, please open an issue in the repository.

---

**Happy Cooking! 👨‍🍳** 

Made with ❤️ for food lovers everywhere.
