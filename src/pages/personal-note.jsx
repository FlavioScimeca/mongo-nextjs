import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/slices/userSlice';
import axios from 'axios';
import Card from '@/components/card';
export default function PersonalNote() {
  const [notes, setNotes] = useState([]);
  const userDetail = useSelector(selectUser);
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const { _id } = userDetail;
    const getNotes = await axios.post('/api/note/getNote', { _id: _id });
    setNotes(getNotes.data.notes);
  };
  console.log(notes);
  return (
    <div className="grid grid-cols-2 gap-2 p-3 md:grid-cols-3">
      {notes.length > 0 &&
        notes.map((note, idx) => <Card key={idx} note={note} />)}
    </div>
  );
}
