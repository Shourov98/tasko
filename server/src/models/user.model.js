import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Hash password if modified / new
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Helper to compare passwords
userSchema.methods.isPasswordMatch = function (raw) {
  return bcrypt.compare(raw, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;