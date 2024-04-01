const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mongoDb = require('./dbconnect.js');
const PORT = process.env.PORT || 3000;




const cors = require('cors');
let bodyParser = require('body-parser');
app.use(bodyParser.json());

// Set up CORS middleware
app.use(cors());

// Specify allowed origins
const allowedOrigins = [
  // 'http://localhost:5173', // Add your local frontend origin
  'https://nesoj.netlify.app', 
  
];

// Configure CORS with dynamic origin based on request origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://nesoj.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


//for checking on render (testing purpose only)
app.get('/register', (req, res)=>{ 
   res.send("backend register server working")
})


const register = require('./controllers/registrationController.js');
app.use('/register', register);

const login = require( './controllers/loginCheck.js' );
app.use("/login", login);

app.listen(PORT, () => {
  console.log("The server is running at Port No 3000...")
});
