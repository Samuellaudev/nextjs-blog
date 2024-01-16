'use client';

import { EMAILS_URL } from '@/utils/constants';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Modal from '@/components/Modal';
import { ToastContainer, toast } from 'react-toastify';

const ResetPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { slug: passwordResetCode } = useParams();

  const dialogContent = {
    title: 'Reset Password Successful',
    body: 'Your password has been reset, now please login with your new password.',
    closeButtonRoute: '/login',
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

  const handleResetClicked = async (e) => {
    e.preventDefault();

    if (password !== newPassword) {
      toast.error('Password and new password do not match');
      return;
    }

    try {
      const response = await axios.put(
        `${EMAILS_URL}/reset-password/${passwordResetCode}`,
        {
          newPassword,
        },
      );
      const { status, message } = response.data;

      if (status === 200) {
        openModal();
      } else if (status === 404) {
        toast.error(message);
      }
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
          onSubmit={handleResetClicked}
        >
          <h2 className="font-mono font-bold mb-5 text-center text-4xl text-gray-600">
            Reset Password
          </h2>
          <p className="text-gray-500 mb-4">
            Please enter a new password and ensure that it matches the entered
            password confirmation.
          </p>
          <label htmlFor="email" className="my-2">
            Password:
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="on"
              placeholder="Password"
              className="w-full mt-1 p-4 border text-center border-gray-300 rounded-md placeholder:font-sans placeholder:font-light dark:bg-white"
            />
          </label>
          <label htmlFor="new-password" className="my-2">
            Confirm new password:
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              autoComplete="on"
              placeholder="New Password"
              className="w-full mt-1 p-4 border text-center border-gray-300 rounded-md placeholder:font-sans placeholder:font-light dark:bg-white"
            />
          </label>
          <button
            type="submit"
            className="w-full md:w-auto flex justify-center items-center p-3 px-9 space-x-4 font-sans font-bold text-white rounded-md bg-cyan-700 hover:bg-opacity-90 shadow-cyan-100 shadow-sm hover:shadow-lg transition hover:-translate-y-0.5 duration-150"
          >
            <span>Reset Password</span>
            <Image src="/svg/right-arrow.svg" alt="" width={20} height={20} />
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ResetPassword;
