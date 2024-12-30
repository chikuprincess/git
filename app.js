require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoutes');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB Atlas connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Removed deprecated options
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Recipe API! Use /api/recipes to interact with the API.');
});

// Use Routes
app.use('/api', recipeRoutes);

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
