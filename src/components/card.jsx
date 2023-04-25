import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Card({ note }) {
  const { title, description } = note;
  const router = useRouter();

  const onDelete = async () => {
    const { _id } = note;
    console.log(_id);
    const deletedNote = await axios.post('api/note/delete', {
      id: _id,
    });
    router.push('/');
    //toast message
  };
  return (
    <div className="p-3 shadow-md bg-zinc-100">
      <p className=" text-center font-semibold py-5">{title}</p>
      <p>{description}</p>
      <div className="flex justify-around mt-4">
        <Link
          href={`/note/${note._id}`}
          className="bg-yellow-400 p-2 rounded-lg"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete()}
          className="bg-red-600 p-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
