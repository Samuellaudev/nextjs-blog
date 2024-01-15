'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { socialLinks } from '@/utils/constants';
import styles from './homePageSection.module.css';
import { useTheme } from 'next-themes';

const renderSocialLinks = () => {
  return (
    <div className="flex justify-between w-32 py-3 mt-4">
      {socialLinks.map((socialLink, index) => (
        <Link href={socialLink.href} key={index}>
          <Image
            src={socialLink.src}
            alt={socialLink.alt}
            className={`duration-200 ${styles.ficon} ${
              index !== socialLinks.length - 1 ? 'mr-2' : ''
            }`}
            width={20}
            height={20}
          />
        </Link>
      ))}
    </div>
  );
};

const iframeStyle = {
  colorScheme: 'none',
};

const FooterSection = () => {
  const { resolvedTheme } = useTheme();

  return (
    <footer className="flex border text-slate-600 dark:text-white border-t-[#33353F] border-l-transparent border-r-transparent border-b-transparent">
      <div className="flex mx-auto container py-12 flex-col md:flex-row items-center justify-between">
        <Link
          href="/"
          className="text-2xl md:text-5xl text-white font-semibold"
        >
          <Image
            src="/images/Logo.png"
            alt="website logo"
            width={35}
            height={35}
            className="mb-6 md:mb-0 mx-auto md:mx-0 rounded"
          />
        </Link>
        <p className="">&copy;2023 Samuel Lau. All right reserved.</p>
        <div className="flex flex-col justify-center items-center">
          {renderSocialLinks()}
          <iframe
            src={`https://status.samuellau.dev/badge?theme=${resolvedTheme}`}
            width="190"
            height="30"
            frameBorder="0"
            scrolling="no"
            style={iframeStyle}
            className="bg-white dark:bg-black"
          />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
