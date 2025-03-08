import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name...."],
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Please enter your email..."],
      unique: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: [true, "Please enter your password....."],
      minlength: [8, "Password should be greater than 8 characters...."],
      select: false,
    },
    phoneNumber: {
      type: Number,
    },
    addresses: [
      {
        country: { type: String },
        city: { type: String },
        address1: { type: String },
        address2: { type: String },
        zipCode: { type: String },
        addressType: { type: String },
      },
    ],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    avatar: {
      public_id: { type: String },
      url: { type: String },
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Generate JWT Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES }
  );
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
