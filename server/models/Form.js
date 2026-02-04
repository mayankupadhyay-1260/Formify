import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
  id: String,
  type: String,
  label: String,
  placeholder: String,
  required: Boolean,
  options: [String],
  order: Number,
});

const responseSchema = new mongoose.Schema({
  answers: {
    type: Object,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const formSchema = new mongoose.Schema({
  title: String,
  description: String,

  fields: [fieldSchema],

  slug: {
    type: String,
    required: true,
  },

  theme: {
    primaryColor: String,
    font: String,
    layout: String,
  },

  responses: [responseSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Form", formSchema);
