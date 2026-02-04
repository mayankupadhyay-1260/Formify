import express from "express";
import Form from "../models/Form.js";

const router = express.Router();

// Save response to form
router.post("/", async (req, res) => {
  try {
    console.log("Received response submission:", req.body);
    
    const { formId, answers } = req.body;

    if (!formId) {
      console.log("Error: formId missing");
      return res.status(400).json({ message: "formId missing" });
    }

    if (!answers || Object.keys(answers).length === 0) {
      console.log("Error: answers missing or empty");
      return res.status(400).json({ message: "answers missing" });
    }

    console.log("Adding response to form with ID:", formId, "and answers:", answers);
    
    // Find the form and add the response to it
    const form = await Form.findById(formId);
    
    if (!form) {
      console.log("Error: Form not found");
      return res.status(404).json({ message: "Form not found" });
    }
    
    // Add response to the form's responses array
    const newResponse = {
      answers,
      submittedAt: new Date()
    };
    
    form.responses.push(newResponse);
    await form.save();
    
    // Get the newly added response (last one in the array)
    const savedResponse = form.responses[form.responses.length - 1];
    
    console.log("Response saved successfully:", savedResponse._id);
    res.status(201).json({
      _id: savedResponse._id,
      formId: formId,
      answers: savedResponse.answers,
      submittedAt: savedResponse.submittedAt
    });

  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ message: "Save failed", error: err.message });
  }
});

// Get responses by formId
router.get("/:formId", async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId);
    
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(form.responses);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch responses",
    });
  }
});

export default router;
