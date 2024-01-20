'use client';

import { useState, useEffect } from 'react';
import { AWS_S3_GET_URL } from '@/utils/constants';
import Image from 'next/image';
import axios from 'axios';
import Loading from './Loading';

const S3Image = ({ imageName, className }) => {
  const [imgLink, setImgLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const retrieveImage = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${AWS_S3_GET_URL}/${imageName}`);
        const { url } = res.data;

        setImgLink(url);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    retrieveImage();
  }, [imageName]);

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

export default S3Image;
