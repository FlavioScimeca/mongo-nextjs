import Note from '../../../../models/noteSchema';
import db from '../../../../lib/dbconnected';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { _id } = req.body;

  await db.connect();

  const note = await Note.findById({ _id: _id });

  await db.disconnect();
  console.log(note);
  res.status(201).send({
    message: 'Note found',
    note: note,
  });
}

export default handler;
