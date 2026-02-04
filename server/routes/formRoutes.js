import express from "express";
import Form from "../models/Form.js";

const router = express.Router();

// Save Form
router.post("/", async (req, res) => {
    try {

        const { title, fields, theme, slug } = req.body;

        if (!slug) {
            return res.status(400).json({
                message: "Slug missing",
            });
        }

        const form = new Form({
            title,
            fields,
            theme,
            slug,
        });

        await form.save();

        res.status(201).json(form);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Save failed",
            error: err.message,
        });
    }
});


// Get all forms
router.get("/", async (req, res) => {
    try {

        const forms = await Form.find().sort({ createdAt: -1 });

        res.json(forms);

    } catch (err) {

        res.status(500).json({
            message: "Failed to fetch forms",
        });

    }
});

// Get form by slug
router.get("/slug/:slug", async (req, res) => {

    try {

        const form = await Form.findOne({
            slug: req.params.slug,
        });

        if (!form) {
            return res.status(404).json({
                message: "Form not found",
            });
        }

        res.json(form);

    } catch (err) {

        res.status(500).json({
            message: "Error fetching form",
        });

    }
});



// Get Form by ID
router.get("/:id", async (req, res) => {
    const form = await Form.findById(req.params.id);
    res.json(form);
});

// Delete form
router.delete("/:id", async (req, res) => {
    try {

        await Form.findByIdAndDelete(req.params.id);

        res.json({ message: "Deleted" });

    } catch (err) {

        res.status(500).json({
            message: "Delete failed",
        });

    }
});


export default router;
