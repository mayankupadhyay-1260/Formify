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

const formSchema = new mongoose.Schema({
  title: String,
  description: String,

  fields: [fieldSchema],

  theme: {
    primaryColor: String,
    font: String,
    layout: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Form", formSchema);
