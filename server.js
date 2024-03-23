const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/social_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB successfully');
});

// Import the routes and models
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

// Setup port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Debug testing
app.get('/', (req, res) => {
    res.send('Hello World!');
});