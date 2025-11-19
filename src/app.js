require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const homeRoutes = require('./routes/home');
const recipeRoutes = require('./routes/recipes');
const searchRoutes = require('./routes/search');
const blogRoutes = require('./routes/blog');

const app = express();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flavor-archive';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', homeRoutes);
app.use('/recipes', recipeRoutes);
app.use('/search', searchRoutes);
app.use('/blog', blogRoutes);

module.exports = app;