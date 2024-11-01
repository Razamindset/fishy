import User from "../lib/models/user.model.mjs";
import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie.mjs";
import bcrypt from "bcryptjs";

const { hash, compare } = bcrypt;

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({
      message: "Please provide all the fields",
    });
  }

  const findUser = await User.findOne({ email });
  if (findUser) {
    return res.status(400).send({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  await generateTokenAndSetCookie(res, user._id);

  return res.send({
    message: "User created successfully",
    user,
  });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      message: "Please provide all the fields",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({
      message: "User does not exist",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send({
      message: "Invalid password",
    });
  }
  await generateTokenAndSetCookie(res, user._id);
  return res.send({
    message: "User logged in successfully",
    user,
  });
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
