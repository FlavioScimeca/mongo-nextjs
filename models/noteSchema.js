import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    user: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      isAdmin: { type: String, required: true },
      _id: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);
export default Note;
