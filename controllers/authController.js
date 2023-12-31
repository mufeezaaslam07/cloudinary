import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { validationResult } from "express-validator";
import cloudinary from "cloudinary";
import uploadToCloudinary from "../cloudinary/cloud.js";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Extracted Data:", { username, password });

    let profilePictureUrl = null;

    if (req.file) {
      try {
        const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
        profilePictureUrl = cloudinaryResult.secure_url;
        console.log("Picture Uploaded Successfully:", profilePictureUrl);
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        res.status(500).json({ message: "Error uploading profile picture" });
        return;
      }
    }

    const user = new User({
      username,
      password,
      profileImage: profilePictureUrl,
    });

    await user.save();

    const responseUser = {
      _id: user._id,
      username: user.username,
      profileImage: user.profileImage,
    };

    res.status(201).json({
      message: "User registered successfully",
      user: responseUser,
      uploadStatus: profilePictureUrl ? "success" : "no-upload",
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { register };

const getAllUsers = async (req, res) => {
  try {
    // console.log("user");
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { getAllUsers };
