'use client';
import { blogPage } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboardStyles.module.css';
import Posts from '@/components/Posts';

const Dashboard = () => {
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (!user?.isAdmin) {
      router.push(`${blogPage}`);
      setIsLogin(false);
      return;
    }

    setIsLogin(true);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col">
      {isLogin && <Posts pageHeading="Dashboard" />}
    </main>
  );
};

export default Dashboard;
