'use client';

import { POSTS_URL, AWS_S3_GET_URL } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { readingTime, formatDate } from '@/utils/helpers';
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
  const [imgLink, setImgLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const retrieveImage = async (imageName) => {
    try {
      const res = await axios.get(`${AWS_S3_GET_URL}/${imageName}`);
      const { url } = res.data;

      setImgLink(url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${POSTS_URL}/${params.id}`);
        const postData = response.data;

        await retrieveImage(postData?.image?.name);
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
          {imgLink ? (
            <div className="mb-6">
              <Image
                src={imgLink}
                alt="post image"
                width={650}
                height={650}
                className="rounded-md mx-auto"
              />
            </div>
          ) : (
            <></>
          )}
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
          <div className={styles.post__body}>
            <MarkdownPreview post={post.body} isEdit={false} />
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
