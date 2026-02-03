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
// Middleware (VERY IMPORTANT ORDER)
// --------------------
app.use(cors());
app.use(express.json());

app.use("/api/forms", formRoutes);
app.use("/api/responses", responseRoutes);


// --------------------
// MongoDB Connection
// --------------------
mongoose.connect("mongodb://localhost:27017/formmaker")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// --------------------
// Routes
// --------------------
app.use("/api/responses", responseRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API Running");
});

// --------------------
// Server Start
// --------------------
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
