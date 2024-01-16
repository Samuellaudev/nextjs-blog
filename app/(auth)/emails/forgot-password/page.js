'use client';

import { EMAILS_URL } from '@/utils/constants';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Modal from '@/components/Modal';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const dialogContent = {
    title: 'Please check your email inbox',
    body: 'Please check your inbox for the reset link and follow the instructions provided to complete the process.',
    closeButtonRoute: '/',
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${EMAILS_URL}/forgot-password`, {
        email,
      });
      const { status, message } = response.data;

      if (status === 404) {
        toast.error(message);
        return;
      }

      openModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        dialog={dialogContent}
      />
      <div className="flex items-center justify-center min-h-screen">
        <form
          className="flex flex-col p-6 w-[280px] md:w-[500px] shadow-2xl rounded-2xl md:flex-col md:m-0 text-black bg-white"
          onSubmit={handleSubmit}
        >
          <h2 className="font-mono font-bold mb-5 text-center text-4xl text-gray-600">
            Forgot
            <br />
            Password
          </h2>
          <p className="text-gray-500 mb-4">
            Please enter your email and we&apos;ll send you a reset link.
          </p>
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

          <div className="flex flex-col items-center justify-between mt-4 md:flex-row md:space-x-4">
            <Link
              href="/login"
              className="font-thin text-cyan-700 mb-5 md:mb-0"
            >
              Go back to login
            </Link>

            <button
              type="submit"
              className={`w-full md:w-auto flex justify-center items-center p-3 px-9 space-x-4 font-sans font-bold text-white rounded-md bg-cyan-700 hover:bg-opacity-90 shadow-cyan-100 shadow-sm hover:shadow-lg transition hover:-translate-y-0.5 duration-150`}
            >
              <span>Next</span>
              <Image src="/svg/right-arrow.svg" alt="" width={20} height={20} />
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
