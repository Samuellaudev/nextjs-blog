'use client';

import { ThemeContext } from '@/context/theme-provider';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useState, useEffect, useContext } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const { setNavbarOpen } = useContext(ThemeContext);

  useEffect(() => setMounted(true), []);

  const handleOnClick = (theme) => {
    setNavbarOpen((prevState) => !prevState);
    setTheme(theme);
  };

  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    );

  if (resolvedTheme === 'dark') {
    return (
      <FiSun
        onClick={() => handleOnClick('light')}
        className="text-white cursor-pointer my-3 md:my-0"
      />
    );
  }

  if (resolvedTheme === 'light') {
    return (
      <FiMoon
        onClick={() => handleOnClick('dark')}
        className="cursor-pointer my-3 md:my-0"
      />
    );
  }
}
