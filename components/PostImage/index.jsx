'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Loading from './Loading';

const PostImage = ({ imageUrl = '', className }) => {
  const [imgLink, setImgLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!imageUrl) {
      return;
    }

    setImgLink(imageUrl);
    setIsLoading(false);
  }, [imageUrl]);

  return isLoading ? (
    <Loading />
  ) : (
    <Image
      src={imgLink}
      alt="post image"
      width={650}
      height={650}
      className={className}
    />
  );
};

export default PostImage;
