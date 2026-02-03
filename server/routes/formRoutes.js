import express from "express";
import Form from "../models/Form.js";

const router = express.Router();

// Save Form
router.post("/", async (req, res) => {
    try {

        console.log("Incoming Form:", req.body);

        const form = new Form(req.body);

        await form.save();

        res.status(201).json({
            _id: form._id,
            slug: form.slug,
            title: form.title,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Save failed",
            error: err.message,
        });
    }
});


// Get All Forms
router.get("/", async (req, res) => {
    const forms = await Form.find();
    res.json(forms);
});

// Get Form by ID
router.get("/:id", async (req, res) => {
    const form = await Form.findById(req.params.id);
    res.json(form);
});

export default router;
