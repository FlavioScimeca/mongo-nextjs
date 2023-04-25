import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '@/slices/userSlice';

export default function FormCreate() {
  const router = useRouter();

  const userDetail = useSelector(selectUser);
  console.log(userDetail);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ title, description }) => {
    try {
      const userFind = await axios.post('/api/note/create', {
        title,
        description,
        user: userDetail,
      });
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="container m-auto mt-4 px-4">
      <form
        className="mx-auto max-w-screen-md bg-zinc-400 p-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl font-semibold">Create Note</h1>

        <div className="mb-4">
          <label htmlFor="title">Title</label>
          <input
            type="title"
            className="w-full p-2"
            id="title"
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
            Add
          </button>
        </div>
      </form>
    </main>
  );
}
