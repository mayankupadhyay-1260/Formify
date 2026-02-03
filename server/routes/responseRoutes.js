import express from "express";
import Response from "../models/Response.js";

const router = express.Router();

// Save response
router.post("/", async (req, res) => {
  try {

    console.log("Incoming Data:", req.body); // DEBUG

    const { formId, answers } = req.body;

    if (!formId || !answers) {
      return res.status(400).json({
        message: "Missing formId or answers",
      });
    }

    const response = new Response({
      formId,
      answers,
    });

    await response.save();

    res.status(201).json({
      message: "Saved successfully",
      data: response,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to save",
      error: err.message,
    });
  }
});

export default router;
