'use client';
import { USERS_URL, blogPage } from '@/utils/constants';
import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '@/context/theme-provider';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoginOrSignup from '@/components/LoginOrSignup';
import Modal from '@/components/Modal';
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
  const { setUserInfo } = useContext(ThemeContext);
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('isLogin') === 'true';
    if (isUserLoggedIn) {
      router.push(`${blogPage}`);
    }
  }, [router]);

  const dialogContent = {
    title: 'Please verify your email address',
    body: 'A verification email has been sent to the email address you provided. Please verify your email to unlock full site features.',
    closeButtonRoute: '/dashboard?pageNumber=1',
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password and confirm password do not match');
      return;
    }

    try {
      const response = await axios.post(`${USERS_URL}/signup`, {
        name,
        email,
        password,
      });
      const { data } = response;

      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('isLogin', true);
      setUserInfo(data);

      openModal();
    } catch (error) {
      console.error('Login error:', error);
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
      <LoginOrSignup
        pageType="signup"
        input={{ name, email, password }}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleConfirmPasswordChange={handleConfirmPasswordChange}
      />
      <ToastContainer />
    </>
  );
};

export default SignUp;
