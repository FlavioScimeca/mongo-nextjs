import db from '../../../../lib/dbconnected';
import Note from '../../../../models/noteSchema';

async function handler(req, res) {
  //   if (req.method != 'DELETE') {
  //     return;
  //   }

  const { id } = req.body;
  console.log('identify ', id);

  await db.connect();
  const findNote = await Note.findByIdAndDelete({ _id: id });
  await db.disconnect();
  res.status(201).send({
    message: 'Note deleted',
  });
  console.log('notaa ', findNote);
}
export default handler;
