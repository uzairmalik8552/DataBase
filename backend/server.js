const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const contactRoutes = require("./routes/contacts");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });

// Use Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/contacts", contactRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
