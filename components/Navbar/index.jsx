'use client';
import { USERS_URL, blogPage, dashboardPage } from '@/utils/constants';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '@/context/theme-provider';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import ThemeSwitch from '../ThemeSwitch';
import MenuOverlay from './MenuOverlay';
import NavLink from './NavLink';
import SearchBox from '../SearchBox';
import VerifyEmailReminder from '../Email/VerifyEmailReminder';
import styles from './navbar.module.css';
import { navLinks } from '@/utils/constants';

const Navbar = () => {
  const { userInfo, navbarOpen, setNavbarOpen } = useContext(ThemeContext);
  const [isLogin, setIsLogin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    const storedIsLogin = localStorage.getItem('isLogin') === 'true';
    if (storedUserInfo || storedIsLogin) {
      setIsLogin(true);
    }
  }, [userInfo]);

  const handleLogout = async () => {
    try {
      await axios.post(`${USERS_URL}/logout`);

      localStorage.removeItem('userInfo');
      localStorage.removeItem('isLogin');
      router.push('/');
      setIsLogin(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNavBarOpen = () => setNavbarOpen((prevState) => !prevState);

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-[999] bg-[#121212] bg-opacity-80 backdrop-blur-md backdrop-opacity-80">
      <div className="flex container flex-wrap items-center justify-between mx-auto px-4 py-2 lg:py-4">
        <Link
          href="/"
          className="text-2xl md:text-5xl text-white font-semibold"
        >
          <Image
            src="/images/Logo.png"
            alt="website logo"
            width={35}
            height={35}
            className="mx-auto md:mx-0 rounded"
          />
        </Link>
        {/* Desktop Menu */}
        <div className="desktop-menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0 items-center">
            {pathname.includes('/blog') && <SearchBox />}
            {isLogin && (
              <>
                {userInfo.isAdmin ? (
                  <NavLink
                    href={`${dashboardPage}`}
                    title={`(${userInfo?.name})`}
                    pathname={pathname}
                  />
                ) : (
                  <NavLink
                    href={`${blogPage}`}
                    title={`(${userInfo?.name})`}
                    pathname={pathname}
                  />
                )}
                <NavLink
                  href=""
                  title="Logout"
                  pathname="/logout"
                  onClick={handleLogout}
                />
              </>
            )}
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  href={link.path}
                  title={link.title}
                  pathname={pathname}
                />
              </li>
            ))}
            <ThemeSwitch />
          </ul>
        </div>
        {/* Mobile Menu */}
        <div className="mobile-menu md:hidden flex items-center">
          {pathname.includes('/blog') && (
            <div className="mr-4">
              <SearchBox isMobile={true} />
            </div>
          )}
          <button onClick={handleNavBarOpen} className={styles.menuIcon}>
            {navbarOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      {navbarOpen && (
        <MenuOverlay
          isLogin={isLogin}
          username={userInfo?.name}
          isAdmin={userInfo?.isAdmin}
          links={navLinks}
          pathname={pathname}
          onClick={handleLogout}
          onClickNavBar={handleNavBarOpen}
        />
      )}
      {isLogin && (
        <VerifyEmailReminder pathname={pathname} userInfo={userInfo} />
      )}
    </nav>
  );
};

export default Navbar;
