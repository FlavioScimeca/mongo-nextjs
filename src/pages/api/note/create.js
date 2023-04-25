import Note from '../../../../models/noteSchema';
import db from '../../../../lib/dbconnected';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { title, description, user } = req.body;
  if (!title || !description || !user) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  await db.connect();

  const newNote = new Note({
    title,
    description,
    user,
  });

  const note = await newNote.save();
  await db.disconnect();
  res.status(201).send({
    message: 'Created note!',
    _id: note._id,
    title: user.title,
  });
}

export default handler;
