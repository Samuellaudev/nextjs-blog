'use client';

import { POSTS_URL, AWS_S3_GET_URL } from '@/utils/constants';
import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '@/context/theme-provider';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { readingTime, formatDate } from '@/utils/helpers';
import S3Image from '@/components/AWS/S3Image';
import MarkdownPreview from '@/components/Markdown/MarkdownPreview';
import Loading from './Loading';
import styles from './postStyles.module.css';

const Post = ({ params }) => {
  const [post, setPost] = useState({
    title: '',
    body: '',
    createdAt: '',
    image: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo } = useContext(ThemeContext);
  const isVerified = userInfo && userInfo.isVerified;

  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${POSTS_URL}/${params.id}`);
        const postData = response.data;

        setPost(postData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [params.id]);

  return (
    <div className={`${styles.light_theme_post} dark:text-white dark:bg-black`}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-6">
            <S3Image
              imageName={post?.image?.name}
              className="rounded-md mx-auto"
            />
          </div>
          <div className="flex flex-row justify-between items-start">
            <h1 className={styles.post__title}>{post.title}</h1>
            <button
              onClick={() => router.back()}
              className={`${styles.light_theme_back_btn} dark:hover:bg-white dark:hover:text-black`}
            >
              &larr; <span className="hidden md:inline">Back</span>
            </button>
          </div>
          <p className={styles.post__date}>
            {formatDate(post?.createdAt)}
            <p className="">{readingTime(post?.body)}</p>
          </p>
          <div
            className={`${styles.post__body} ${
              !isVerified ? styles.blurred__container : ''
            }`}
          >
            <MarkdownPreview
              post={post.body}
              isEdit={false}
              extraClass={`${styles.markdownBody}`}
            />
            {!isVerified ? (
              <div className="absolute text-center bg-white text-black p-4 w-80 rounded-md left-0 md:right-0 mx-auto bottom-1/3 z-10 ring-offset-2 ring-4 ring-gray-200">
                <p className="text-2xl font-semibold">Login</p>
                <p className="my-4 mb-8 text-gray-500">
                  Access premium content by logging in to your account.
                </p>
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="border rounded-md p-2 w-full bg-cyan-700 text-white hover:bg-white hover:text-cyan-700 transition duration-200"
                >
                  Login
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
