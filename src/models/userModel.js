import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide Password"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  phone: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  pin: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
