const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/db");

    let user = await User.findOne({ email: "2022cs0082@svce.ac.in" });
    if (user) {
      console.log("Admin user already exists");
      return;
    }

    user = new User({
      email: "2022cs0082@svce.ac.in",
      password: "admin123", // Set a secure password
      role: "Admin",
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    console.log("Admin user created");
    mongoose.connection.close();
  } catch (err) {
    console.error(err.message);
    mongoose.connection.close();
  }
};

createAdmin();
