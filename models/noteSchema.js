import mongoose from 'mongoose';
import User from './userSchema';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    user: { type: Object, User },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);
export default Note;
