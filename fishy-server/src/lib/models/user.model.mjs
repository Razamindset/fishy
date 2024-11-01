import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/50*50",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose?.models?.User || mongoose?.model("User", userSchema);

export default User;
