'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LoginOrSignUp = ({
  pageType,
  input = { name: '', email: '', password: '', confirmPassword: '' },
  handleSubmit,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
  handleConfirmPasswordChange,
}) => {
  const { name, email, password, confirmPassword } = input;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="flex flex-col p-6 w-[280px] md:w-auto shadow-2xl rounded-2xl md:flex-col md:m-0 text-black bg-white"
        onSubmit={handleSubmit}
      >
        <h2 className="font-mono font-bold mb-5 text-center text-4xl text-gray-600">
          {pageType === 'login' ? 'Log In' : 'Sign Up'}
        </h2>
        {pageType === 'signup' && (
          <label htmlFor="name" className="my-2">
            Name:
            <input
              type="name"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
              placeholder="Enter name"
              className="w-full mt-1 p-4 border text-center border-gray-300 rounded-md placeholder:font-sans placeholder:font-light dark:bg-white"
            />
          </label>
        )}
        <label htmlFor="email" className="my-2">
          Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="Enter email address"
            className="w-full mt-1 p-4 border text-center border-gray-300 rounded-md placeholder:font-sans placeholder:font-light dark:bg-white"
          />
        </label>
        <label htmlFor="password" className="my-2">
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Enter password"
            className="w-full mt-1 p-4 border text-center border-gray-300 rounded-md placeholder:font-sans placeholder:font-light dark:bg-white"
          />
        </label>
        {pageType === 'signup' && (
          <label htmlFor="confirmPassword" className="my-2">
            Confirm password:
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              placeholder="Confirm password"
              className="w-full mt-1 p-4 border text-center border-gray-300 rounded-md placeholder:font-sans placeholder:font-light dark:bg-white"
            />
          </label>
        )}
        <div className="flex flex-col items-center justify-between mt-4 md:flex-row md:space-x-4">
          {pageType === 'login' && (
            <Link
              href="/emails/forgot-password"
              className="font-thin text-cyan-700 mb-5 md:mb-0"
            >
              Forgot password
            </Link>
          )}
          <button
            type="submit"
            className={`w-full md:w-auto flex justify-center items-center p-3 px-9 space-x-4 font-sans font-bold text-white rounded-md bg-cyan-700 hover:bg-opacity-90 shadow-cyan-100 shadow-sm hover:shadow-lg transition hover:-translate-y-0.5 duration-150 
            ${pageType === 'signup' ? 'md:w-full' : ''}`}
          >
            <span>Next</span>
            <Image src="/svg/right-arrow.svg" alt="" width={20} height={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginOrSignUp;
