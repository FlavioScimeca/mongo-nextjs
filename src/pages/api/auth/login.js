import User from '../../../../models/userSchema';
import db from '../../../../lib/dbconnected';
import bcryptjs from 'bcryptjs';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { email, password } = req.body;

  await db.connect();

  const existingUser = await User.findOne({ email: email });

  if (password && existingUser.password !== password) {
    res.status(401).send({ message: 'password not matched' });
    return;
  }

  if (existingUser) {
    res.status(201).send({
      message: 'User found',
      existingUser,
    });
    await db.disconnect();
    return;
  } else {
    res.status(400).send({
      message: 'User not found',
    });
  }

  await db.disconnect();
}

export default handler;
