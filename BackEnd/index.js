const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Allows your React app to talk to this server

// 1. Connect to your MongoDB Atlas Cluster
// Using the direct shard connection string to bypass DNS issues
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 45000,         
})
  .then(() => console.log("✅ MindEase Database Connected"))
  .catch(err => {
    console.error("❌ Connection Error Detail:", err.message);
  });

// 2. Define the User Schema matching your Atlas document exactly
const userSchema = new mongoose.Schema({
  Email: { type: String, required: true },
  PasswordHash: { type: String, required: true }, 
  FullName: String,
  AccountStatus: { type: String, default: 'Active' },
  Role: { type: String, required: true }, // 'Admin' or 'Counselor'
  CreatedAt: { type: Date, default: Date.now }
});

// Link specifically to the 'Users' collection in the 'MindEase' database
const User = mongoose.model('User', userSchema, 'Users');

// 3. The Login API Route
app.post('/api/login', async (req, res) => {
  const { email, password, role } = req.body;
  
  // Debug log to see what the frontend is sending
  console.log(`Attempting login: ${email} as ${role}`);

  try {
    // Search the database using capitalized keys from your Atlas screenshot
    const user = await User.findOne({ 
      Email: email, 
      PasswordHash: password, 
      Role: role 
    });
    
    if (user) {
      console.log("✅ Match found!");
      res.json({ 
        success: true, 
        user: { 
          email: user.Email, 
          role: user.Role, 
          name: user.FullName 
        } 
      });
    } else {
      console.log("❌ No match in database.");
      res.status(401).json({ 
        success: false, 
        message: "Invalid email, password, or role selection." 
      });
    }
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));