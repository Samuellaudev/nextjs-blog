'use client';

import { POSTS_URL } from '@/utils/constants';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import S3Image from '../AWS/S3Image';
import { formatDate } from '@/utils/helpers';
import { Post } from '@/types/posts.type';

const initialPost: Post = {
  _id: "",
  title: "",
  description: "",
  body: "",
  createdAt: "",
  updatedAt: "",
  __v: 0,
  image: {
    name: "",
    type: "",
    lastModified: 0
  },
  isFeatured: false,
  isPremium: false
};

const HeroSection = () => {
  const [featuredPost, setFeaturePost] = useState<Post>(initialPost);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFeaturedPost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${ POSTS_URL }`);
      const { posts } = response.data;

      const featuredPost = posts.find((p: Post) => p.isFeatured) as Post

      setFeaturePost(featuredPost);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching featuredPost:', error);
    }
  };

  useEffect(() => {
    fetchFeaturedPost();
  }, []);

  return (
    <section className="container mt-16 md:mt-28 mx-auto">
      <h2 className="text-3xl mb-9 md:text-4xl text-gray-500 dark:text-white">
        Featured Post
      </h2>
      <S3Image
        imageName={ featuredPost?.image?.name }
        className="relative z-10 object-cover w-full rounded-md h-96 border"
      />

      <div className="relative z-20 max-w-lg p-6 mx-2 md:mx-auto -mt-20 bg-white rounded-md dark:bg-gray-900 shadow-md  hover:scale-110 hover:shadow-2xl hover:-translate-y-1 duration-200">
        <Link
          href={ `/blog/${ featuredPost?._id }` }
          className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl"
        >
          { featuredPost?.title }
        </Link>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
          { featuredPost?.description }
        </p>
        <p className="mt-3 text-sm text-primary-500">
          { formatDate(featuredPost?.createdAt) }
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
