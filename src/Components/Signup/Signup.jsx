import React, { useState } from 'react';
import { Input, Button, Logo } from '../Index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../Appwrite/Auth';
import { login } from '../../Store/AuthSlice';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const create = async (data) => {
    setError('');
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-200 shadow-lg transform transition-all duration-500 ease-in-out hover:shadow-2xl">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Sign up to create an Account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-500 transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="space-y-6 mt-6">
          <Input
            label="Name:"
            type="text"
            className="w-full"
            {...register('name', {
              required: true,
            })}
            placeholder="Enter your Name..."
          />

          <Input
            label="Email:"
            type="email"
            className="w-full"
            {...register('email', {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(value) ||
                  'Email address must be a valid address',
              },
            })}
            placeholder="Enter your Email..."
          />

          <Input
            label="Password:"
            type="password"
            className="w-full"
            {...register('password', {
              required: true,
            })}
            placeholder="Enter your Password..."
          />

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
