const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://asuj:Asuj321@asujcluster.uglyh6t.mongodb.net/nesoj';
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173' // Replace with your frontend origin
}));

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define a schema for the user
const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  middleName: String,
  lastName: String,
  userName: String,
  password: String,
  confPassword: String,
  university: String,
  universityID: String,
  course: String,
  year: Number,
  aadhar: Number,
  gender:  String,
  residence: String



});

const User = mongoose.model('User', userSchema);

// Body parsing middleware
app.use(express.json());

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, firstName, middleName, lastName, password, userName, university, universityID, course, year, aadhar ,gender , residence } = req.body;
    // Create a new user instance
    const newUser = new User({ email, firstName, middleName, lastName, password, userName, university, universityID, course, year, aadhar, gender, residence });
    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
