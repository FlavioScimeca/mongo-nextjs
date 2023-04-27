import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/slices/userSlice';
import axios from 'axios';
import Card from '@/components/card';
import Header from '@/components/header';
export default function PersonalNote() {
  const [notes, setNotes] = useState([]);
  const userDetail = useSelector(selectUser);
  const getNotes = async () => {
    const { _id } = userDetail;
    const getNotes = await axios.post('/api/note/getNote', { _id: _id });
    setNotes(getNotes.data.notes);
  };
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(notes);
  return (
    <>
      <Header />

      {notes.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 p-3 md:grid-cols-3 max-w-4xl mx-auto">
          {notes.map((note, idx) => (
            <Card key={idx} note={note} />
          ))}
        </div>
      ) : (
        <div className=" text-center mt-10 font-semibold">
          Nessuna nota/ loading..
        </div>
      )}
    </>
  );
}
