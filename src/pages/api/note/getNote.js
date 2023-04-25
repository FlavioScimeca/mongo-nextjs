import Note from '../../../../models/noteSchema';
import db from '../../../../lib/dbconnected';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { _id } = req.body;

  await db.connect();

  const notes = await Note.find({ 'user._id': _id });

  await db.disconnect();
  res.status(201).send({
    message: 'Note/s send',
    notes: notes,
  });
}

export default handler;
