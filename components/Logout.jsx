'use client';

import { USERS_URL } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useContext } from 'react';
import { ThemeContext } from '@/context/theme-provider';

const Logout = ({ content, className }) => {
  const { setUserInfo } = useContext(ThemeContext);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(`${USERS_URL}/logout`);

      localStorage.removeItem('userInfo');
      localStorage.removeItem('isLogin');
      setUserInfo({});

      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button type="button" onClick={handleLogout} className={className}>
      {content}
    </button>
  );
};

export default Logout;
