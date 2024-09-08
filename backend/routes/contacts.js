const express = require("express");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware");
const Contact = require("../models/Contact");
const User = require("../models/User");
const router = express.Router();

// Create a new contact
router.post("/add-hr", authMiddleware(["Member"]), async (req, res) => {
  const role = req.user.role;
  if (role == "Member") {
    const {
      hrName,
      hrNumber,
      hrCompany,
      hrEmail,
      status,
      transportMode,
      interviewPreference,
      callback,
      callbackTime,
      comment,
      address,
      departmentPreference,
      hrCount,
    } = req.body;
    const userId = req.user.id;

    try {
      const member = await User.findById(userId);
      const executiveDirectorId = member.executiveDirector;

      const newContact = new Contact({
        userId,
        executiveDirectorId,
        hrName,
        hrNumber,
        hrCompany,
        hrEmail,
        status,
        transportMode: transportMode || "",
        interviewPreference: interviewPreference || "",
        callback,
        callbackTime,
        comment,
        address,
        departmentPreference,
        hrCount,
      });

      await newContact.save();
      res.json({
        message: "Contact created successfully",
        contact: newContact,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
});

// Get all contacts for the logged-in user
router.get(
  "/",
  authMiddleware(["Member", "Executive Director", "Admin"]),
  async (req, res) => {
    const role = req.user.role;

    if (role == "Member") {
      try {
        const contacts = await Contact.find({ userId: req.user.id });
        res.json(contacts);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    } else if (role == "Executive Director") {
      try {
        const contacts = await Contact.find({
          executiveDirectorId: req.user.id,
        });

        res.json(contacts);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    }
  }
);

// Get single contacts for the logged-in user
router.get(
  "/single",
  authMiddleware(["Member", "Executive Director", "Admin"]),
  async (req, res) => {
    const { id } = req.query; // Retrieve the ID from the query parameters

    try {
      const contact = await Contact.findById(id); // Use findById to fetch the contact by its ID

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// get all the contact from the database
router.get(
  "/all",
  authMiddleware(["Executive Director", "Admin"]),
  async (req, res) => {
    try {
      // Fetch all contacts from the database
      const contacts = await Contact.find();

      // Send the contacts in the response
      res.status(200).json(contacts);
    } catch (error) {
      // Handle errors, send error response
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Server error fetching contacts" });
    }
  }
);

// Update a contact
router.put(
  "/:id",
  authMiddleware(["Member", "Executive Director", "Admin"]),
  async (req, res) => {
    const { id } = req.params;

    try {
      // Fetch the contact to update
      const contact = await Contact.findOne({ _id: id });
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.json({ message: "Contact updated successfully", updatedContact });
    } catch (error) {
      console.error("Error updating contact:", error); // Log the error for debugging
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete a contact
router.delete(
  "/:id",
  authMiddleware(["Member", "Executive Director", "Admin"]),
  async (req, res) => {
    const { id } = req.params;
    const role = req.user.role;
    if (role == "Member") {
      const userId = req.user.id;

      try {
        const contact = await Contact.findOneAndDelete({ _id: id, userId });

        if (!contact) {
          return res.status(404).json({ message: "Contact not found" });
        }

        res.json({ message: "Contact deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    } else if (role == "Executive Director") {
      const executiveDirectorId = req.user.id;

      try {
        const contact = await Contact.findOneAndDelete({
          _id: id,
          executiveDirectorId,
        });

        if (!contact) {
          return res.status(404).json({ message: "Contact not found" });
        }

        res.json({ message: "Contact deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    } else if (role == "Admin") {
      try {
        const contact = await Contact.findOneAndDelete({
          _id: id,
        });

        if (!contact) {
          return res.status(404).json({ message: "Contact not found" });
        }

        res.json({ message: "Contact deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    }
  }
);

// reminderflag update

router.put(
  "/reminder-flag/:id",
  authMiddleware(["Member", "Executive Director", "Admin"]),
  async (req, res) => {
    const { id } = req.params; // Get id from URL parameter
    const { reminderFlag } = req.body; // Get reminderFlag from request body

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }

    try {
      const contact = await Contact.findById(id); // Find the contact by ID
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      contact.reminderFlag = reminderFlag; // Update the reminderFlag
      await contact.save(); // Save the updated contact

      res.json({ message: "Reminder flag updated successfully", contact });
    } catch (error) {
      console.error("Error updating contact:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get(
  "/members",
  authMiddleware(["Executive Director"]),
  async (req, res) => {
    try {
      // Fetch users with matching executiveDirector and only select their name and _id
      const members = await User.find({
        executiveDirector: req.user.id,
      }).select("name _id");

      res.json(members);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

router.put(
  "/transfer-contacts",
  authMiddleware(["Executive Director", "Admin"]),
  async (req, res) => {
    const { sourceMemberId, targetMemberId, contactIds } = req.body;
    const executiveDirectorId = req.user.id;

    try {
      // Validate the input
      if (
        !mongoose.Types.ObjectId.isValid(sourceMemberId) ||
        !mongoose.Types.ObjectId.isValid(targetMemberId) ||
        !Array.isArray(contactIds) ||
        contactIds.length === 0
      ) {
        return res.status(400).json({ message: "Invalid input data" });
      }

      // Ensure the source and target members exist and belong to the same Executive Director
      const sourceMember = await User.findOne({
        _id: sourceMemberId,
        executiveDirector: executiveDirectorId,
      });
      const targetMember = await User.findOne({
        _id: targetMemberId,
        executiveDirector: executiveDirectorId,
      });
      console.log("hello");
      if (!sourceMember || !targetMember) {
        return res
          .status(404)
          .json({ message: "Source or target member not found" });
      }

      // Update the contacts' userId to the target member's ID
      const result = await Contact.updateMany(
        { _id: { $in: contactIds }, userId: sourceMemberId },
        { $set: { userId: targetMemberId } }
      );
      console.log("he");
      if (result.nModified === 0) {
        return res
          .status(404)
          .json({ message: "No contacts were transferred" });
      }

      res.json({
        message: "Contacts transferred successfully",
        transferredCount: result.nModified,
      });
    } catch (error) {
      console.error("Error transferring contacts:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
