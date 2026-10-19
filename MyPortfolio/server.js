require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Portfolio')
.then(() => {
  console.log('Successfully connected to MongoDB Portfolio database.');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Welcome Route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

// API Routes (Must be defined BEFORE app.listen)
const contactRoutes = require('./routes/contact.routes');
app.use('/api/contacts', contactRoutes);

const projectRoutes = require('./routes/project.routes');
app.use('/api/projects', projectRoutes);

const qualificationRoutes = require('./routes/qualification.routes');
app.use('/api/qualifications', qualificationRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);


// Port configuration & Server Start (Explicitly bound to 127.0.0.1)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});