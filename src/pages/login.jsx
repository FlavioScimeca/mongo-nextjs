import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserLoginDetails } from '@/slices/userSlice';

export default function LoginScreen() {
  const router = useRouter();

  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const userFind = await axios.post('/api/auth/login', {
        email,
        password,
      });
      dispatch(
        setUserLoginDetails({
          name: userFind.data.existingUser.name,
          email: userFind.data.existingUser.email,
          isAdmin: userFind.data.existingUser.isAdmin,
          _id: userFind.data.existingUser._id,
        })
      );
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
        <h1 className="mb-4 text-xl font-semibold">Login</h1>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="w-full p-2"
            id="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="w-full p-2"
            id="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 6,
                message: 'password is more than 5 chars',
              },
            })}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4 ">
          <button className="bg-emerald-600 rounded-lg p-3 hover:bg-emerald-300 transition-all duration-200">
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
