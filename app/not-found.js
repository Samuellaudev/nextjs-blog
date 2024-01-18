'use client';

import { blogPage } from '@/utils/constants';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-48 space-y-8 text-gray-600">
      <h2 className="text-4xl font-bold">404 Not Found</h2>
      <p>Sorry, the requested resource could not be found.</p>
      <p className="border border-gray-300 rounded-md px-4 py-2 text-lg cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-200">
        <Link href={`${blogPage}`}>View All Posts</Link>
      </p>
    </div>
  );
}
