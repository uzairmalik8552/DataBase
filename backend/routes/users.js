const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Add Executive Director (Admin Only)
router.post(
  "/add-executive-director",
  authMiddleware(["Admin"]),
  async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ email, role: "Executive Director" });
      if (user) {
        return res
          .status(400)
          .json({ message: "Executive Director already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newDirector = new User({
        name,
        email,
        password: hashedPassword,
        role: "Executive Director",
      });

      await newDirector.save();
      res.json({ message: "Executive Director created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Add Member (Executive Director Only)
// Add Member (Executive Director or Admin Only)
router.post(
  "/add-member",
  authMiddleware(["Executive Director", "Admin"]),
  async (req, res) => {
    const { name, email, password, executiveDirectorId } = req.body;
    console.log(executiveDirectorId);

    try {
      // Check if a user with the same email and role "Member" already exists
      const user = await User.findOne({ email, role: "Member" });
      if (user) {
        return res.status(400).json({ message: "Member already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newMember = new User({
        name,
        email,
        password: hashedPassword,
        role: "Member",
        executiveDirector: executiveDirectorId, // Store the selected Executive Director's ID
      });

      await newMember.save();
      res.json({ message: "Member created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get Executive Directors (Admin Only)
router.get(
  "/executive-directors",
  authMiddleware(["Admin"]),
  async (req, res) => {
    try {
      const directors = await User.find({ role: "Executive Director" }).select(
        "name email"
      );
      res.json(directors);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
