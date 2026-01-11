const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exist"]
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  authImage: {
    type: String,
    // required: true
  },
  role: {
    type: String,
    enum: ["buyer", "seller", "admin"],
    default: "admin"
  },

  refreshToken: {
    type: String,
    default: null
  },
  
  
  // Status and Verification
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  verificationToken: String,

  verificationExp: String,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const userModel = mongoose.model("user", userSchema)

module.exports = userModel