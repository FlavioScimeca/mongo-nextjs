import Header from '@/components/header';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function EditNote() {
  const router = useRouter();
  const [note, setNote] = useState({});

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ title, description }) => {
    const { _id } = router.query;
    try {
      const editNote = await axios.post('/api/note/edit', {
        title,
        description,
        _id,
      });
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNote();
  }, []);
  const { _id } = router.query;
  const getNote = async () => {
    const getNote = await axios.post('/api/note/findNote', { _id: _id });
    setNote(getNote.data.note);
  };
  console.log(note);
  return (
    <>
      <Header />
      {note != {} ? (
        <main className="container m-auto mt-4 px-4">
          <form
            className="mx-auto max-w-screen-md bg-zinc-400 p-4"
            onSubmit={handleSubmit(submitHandler)}
          >
            <h1 className="mb-4 text-xl font-semibold">Edit Note</h1>

            <div className="mb-4">
              <label htmlFor="title">Title</label>
              <input
                type="title"
                className="w-full p-2"
                id="title"
                placeholder={note.title}
                {...register('title', {
                  required: 'Please enter title',
                  minLength: {
                    value: 4,
                    message: 'title must be more than 3 chars',
                  },
                })}
              />
              {errors.title && (
                <div className="text-red-500">{errors.title.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <input
                type="description"
                className="w-full p-2"
                placeholder={note.description}
                id="description"
                {...register('description', {
                  required: 'Please enter description',
                  minLength: {
                    value: 6,
                    message: 'description must be more than 5 chars',
                  },
                })}
              />
              {errors.description && (
                <div className="text-red-500">{errors.description.message}</div>
              )}
            </div>

            <div className="mb-4 ">
              <button className="bg-emerald-600 rounded-lg p-3 hover:bg-emerald-300 transition-all duration-200">
                Edit
              </button>
            </div>
          </form>
        </main>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
