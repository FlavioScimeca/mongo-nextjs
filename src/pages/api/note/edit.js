import db from '../../../../lib/dbconnected';
import Note from '../../../../models/noteSchema';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { title, description, _id } = req.body;

  await db.connect();

  const note = await Note.updateOne(
    { _id: _id },
    { $set: { title: title, description: description } }
  );

  await db.disconnect();
  console.log(note);
  res.status(201).send({
    message: 'Note found',
    note: note,
  });
}

export default handler;
