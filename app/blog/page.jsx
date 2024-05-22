import { Suspense } from 'react';
import Posts from '@/components/Posts';

const Blog = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <Suspense>
        <Posts pageHeading="Latest Posts" />
      </Suspense>
    </main>
  );
};

export default Blog;
