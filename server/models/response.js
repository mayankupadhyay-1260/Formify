import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  fieldId: String,
  label: String,
  value: mongoose.Schema.Types.Mixed
});

const responseSchema = new mongoose.Schema({
  formId: {
    type: String,
    required: true,
  },

  answers: [answerSchema], // <-- ARRAY NOW

  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Response", responseSchema);
