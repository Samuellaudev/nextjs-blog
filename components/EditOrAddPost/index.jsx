'use client';

import { AWS_S3_UPLOAD_URL, POSTS_URL, fieldMap } from '@/utils/constants';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import MarkdownPreview from '@/components/Markdown/MarkdownPreview';
import { ToastContainer, toast } from 'react-toastify';
import styles from './editOrAddPostStyles.module.css';
import { modifiedImageName, originalImageName } from '@/utils/helpers';

const EditOrAddNewPost = ({ postType }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState({});

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const checkLogin = () => {
      const loggedIn =
        localStorage.getItem('isLogin') && localStorage.getItem('userInfo');
      setIsLogin(loggedIn);
      if (!loggedIn) router.push('/');
    };

    checkLogin();

    if (params.id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`${POSTS_URL}/${params.id}`);
          const { data: postData } = response;
          const { title, body, description, image } = postData;

          setTitle(title);
          setBody(body);
          setDescription(description);
          setImage(image);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };

      fetchPost();
    }
  }, [router, params.id]);

  const handleInputChange = (e, updateFunction) =>
    updateFunction(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const uploadImage = async (formData) => {
    try {
      const response = await fetch(`${AWS_S3_UPLOAD_URL}`, {
        method: 'POST',
        body: formData,
      });

      await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormInvalid = ({ title, body, description }) => {
      return title === '' || body === '' || description === '';
    };

    const handleImage = (image) => {
      if (image?.name) {
        const newImage = new File(
          [image],
          modifiedImageName(params.id, image?.name),
          {
            type: image.type,
            lastModified: image.lastModified,
          },
        );

        const formData = new FormData();
        formData.append('image', newImage);

        uploadImage(formData);
      }
    };

    const resetForm = () => {
      setTitle('');
      setBody('');
      setDescription('');
      setImage({});
    };

    const redirectToDashboard = () => {
      setTimeout(() => {
        router.push('/dashboard?search=&pageNumber=1');
      }, 500);
    };

    try {
      const postData = {
        title,
        body,
        description,
        image: {
          name: modifiedImageName(params.id, image?.name),
          type: image?.type,
          lastModified: image?.lastModified,
        },
      };

      if (isFormInvalid(postData)) {
        toast.error('Please fill in the title, body, and description');
        return;
      }

      let response;
      if (postType === 'edit-post') {
        response = await axios.put(`${POSTS_URL}/${params.id}`, postData);
      } else if (postType === 'new-post') {
        response = await axios.post(`${POSTS_URL}`, postData);
      }

      handleImage(image);

      if (response.status === 200) {
        toast.success(fieldMap[postType].successMessage);

        if (postType === 'new-post') {
          resetForm();
        }

        redirectToDashboard();
      }
    } catch (error) {
      console.log(error);
      toast.error(fieldMap[postType].errorMessage);
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      <div
        className={`${styles.light_theme_post} dark:text-white dark:bg-black`}
      >
        {isLogin && (
          <>
            <div className="flex flex-row justify-between items-end">
              <h1 className={styles.post__heading}>
                {fieldMap[postType].title}
              </h1>
              <button
                onClick={() => router.back()}
                className={`${styles.light_theme_back_btn} dark:hover:bg-white dark:hover:text-black`}
              >
                <span className="hidden md:inline">&larr; </span>Back
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="image" className="mt-10 mb-2 text-lg">
                <b>Image</b>
              </label>
              <input
                disabled
                value={originalImageName(image?.name)}
                className={`${styles.light_theme_form} mb-2 dark:text-white dark:bg-[#18191E] dark:border-[#33353F]`}
              />
              <input
                type="file"
                name="image"
                label="Choose File"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
                className="w-auto md:w-[24rem]"
              />
              <label htmlFor="title" className="mt-10 mb-2 text-lg">
                <b>Title</b>
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => handleInputChange(e, setTitle)}
                placeholder="Post Title"
                className={`${styles.light_theme_form} dark:text-white dark:bg-[#18191E] dark:border-[#33353F]`}
                required
              />
              <label htmlFor="description" className="mt-10 mb-2 text-lg">
                <b>Description</b>
              </label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={(e) => handleInputChange(e, setDescription)}
                placeholder="Post Description"
                className={`${styles.light_theme_form} dark:text-white dark:bg-[#18191E] dark:border-[#33353F]`}
                required
              />
              <label htmlFor="body" className="mt-4 mb-2 text-lg">
                <b>Content</b>
              </label>
              <div className={styles.post__body}>
                <MarkdownPreview
                  isEdit
                  input={body}
                  setInput={setBody}
                  handleInputChange={(e) => handleInputChange(e, setBody)}
                />
              </div>
              <button
                type="submit"
                className="mt-7 p-3 px-9 space-x-4 w-auto md:w-20 flex justify-center items-center font-sans font-bold text-white bg-cyan-700 border border-white hover:bg-white hover:text-cyan-700 hover:border-cyan-700 transition duration-200"
              >
                {fieldMap[postType].submitButton}
              </button>
            </form>
          </>
        )}
      </div>
      <ToastContainer />
    </main>
  );
};

export default EditOrAddNewPost;
