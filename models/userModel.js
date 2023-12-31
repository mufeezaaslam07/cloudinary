import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
});

userSchema.statics.getAllUsers = async function () {
  return this.find();
};

const User = model("User", userSchema);

export default User;
