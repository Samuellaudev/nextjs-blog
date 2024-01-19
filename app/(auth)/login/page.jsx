'use client';
import { USERS_URL, blogPage, dashboardPage } from '@/utils/constants';
import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '@/context/theme-provider';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoginOrSignup from '@/components/LoginOrSignup';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const { setUserInfo } = useContext(ThemeContext);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('isLogin') === 'true';
    if (isUserLoggedIn) {
      router.push(`${blogPage}`);
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${USERS_URL}/login`, {
        email,
        password,
      });

      const { data } = response;

      if (data?.status === 401) {
        toast.error(data.message);
        return;
      }

      localStorage.setItem('userInfo', JSON.stringify(data));
      setUserInfo(data);

      localStorage.setItem('isLogin', true);

      if (data.isAdmin) {
        router.push(`${dashboardPage}`);
      } else {
        router.push(`${blogPage}`);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <>
      <LoginOrSignup
        pageType="login"
        input={{ email, password }}
        handleSubmit={handleSubmit}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
      />
      <ToastContainer />
    </>
  );
};

export default Login;
