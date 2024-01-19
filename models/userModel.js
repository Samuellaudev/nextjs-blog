import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isPremium: {
      type: Boolean,
      required: true,
      default: false,
    },
    verificationString: {
      type: String,
      default: '',
    },
    passwordResetCode: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // Adds 'createdAt' and 'updatedAt' timestamps to the user model
  },
  {
    strict: true,
  },
);

// Define a method on the userSchema to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Use bcrypt to compare the entered password with the hashed password stored in the database
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.models?.User || mongoose.model('User', userSchema);

export default User;
