const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Allows your React app to talk to this server

// 1. Connect to your MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MindEase Database Connected"))
  .catch(err => console.error("❌ Connection Error:", err));

// 2. Define the User Schema matching your 'Users' collection
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }, 
  role: { type: String, required: true }, // 'Admin' or 'Counselor'
  name: String
});

// Link to the specific 'Users' collection in the 'MindEase' database
const User = mongoose.model('User', userSchema, 'Users');

// 3. The Login API Route
app.post('/api/login', async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    // Search the database for a user matching all three criteria
    const user = await User.findOne({ email, password, role });
    
    if (user) {
      res.json({ 
        success: true, 
        user: { 
          email: user.email, 
          role: user.role, 
          name: user.name 
        } 
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: "Invalid email, password, or role selection." 
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));