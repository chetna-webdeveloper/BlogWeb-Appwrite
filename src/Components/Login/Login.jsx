import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as authLogin } from '../../Store/AuthSlice';
import { Button, Input, Logo } from '../Index';
import { useDispatch } from 'react-redux';
import authService from '../../Appwrite/Auth';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(authLogin(user));
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-200 shadow-lg transform transition-all duration-500 ease-in-out hover:shadow-2xl">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Sign in to your Account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-500 transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="space-y-6 mt-6">
          <Input
            label="Email:"
            placeholder="Enter your Email..."
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
          />

          <Input
            label="Password:"
            placeholder="Enter your Password..."
            type="password"
            className="w-full"
            {...register('password', {
              required: true,
            })}
          />

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
