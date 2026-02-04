import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import formRoutes from "./routes/formRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json());

// --------------------
// Routes
// --------------------
app.use("/api/forms", formRoutes);
app.use("/api/responses", responseRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API Running");
});

// --------------------
// MongoDB Connection & Server Start
// --------------------
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/formmaker");
    console.log("MongoDB Connected Successfully");
    
    // Start server only after MongoDB connection is established
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`MongoDB URI: ${process.env.MONGODB_URI || "mongodb://localhost:27017/formmaker"}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
