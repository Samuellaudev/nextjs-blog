'use client';

import {
  IMAGE_UPLOAD_URL,
  POSTS_URL,
  fieldMap,
  dashboardPage,
} from '@/utils/constants';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MarkdownPreview from '@/components/Markdown/MarkdownPreview';
import { ToastContainer, toast } from 'react-toastify';
import styles from './editOrAddPostStyles.module.css';
import { originalImageName } from '@/utils/helpers';

const EditOrAddNewPost = ({ postType }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState({});
  const [isPremium, setIsPremium] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

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
          const { title, body, description, image, isPremium, isFeatured } =
            postData;

          setTitle(title);
          setBody(body);
          setDescription(description);
          setImage(image);
          setIsPremium(isPremium);
          setIsFeatured(isFeatured);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };

      fetchPost();
    }
  }, [router, params.id]);

  const handleInputChange = (e, updateFunction) => {
    return updateFunction(e.target.value);
  };
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const uploadImage = async (image) => {
    const newImage = new File([image], image?.name, {
      type: image.type,
      lastModified: image.lastModified,
    });

    const formData = new FormData();
    formData.append('image', newImage);

    try {
      const response = await fetch(`${IMAGE_UPLOAD_URL}`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      return result.url;
    } catch (error) {
      console.log(error);
    }
  };

  const isFormInvalid = ({ title, body, description }) => {
    return title === '' || body === '' || description === '';
  };

  const resetForm = () => {
    setTitle('');
    setBody('');
    setDescription('');
    setImage({});
  };

  const redirectToDashboard = () => {
    setTimeout(() => {
      router.push(`${dashboardPage}`);
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imgUrl = await uploadImage(image);

      const postData = {
        title,
        body,
        description,
        image: {
          url: imgUrl,
          name: image?.name,
          type: image?.type,
          lastModified: image?.lastModified,
        },
        isPremium,
        isFeatured,
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

      const { status, message } = response.data;
      if (status === 401) {
        toast.error(message);
        return;
      }

      if (postType === 'new-post') resetForm();

      toast.success(fieldMap[postType].successMessage);
      setTimeout(() => redirectToDashboard(), 500);
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
                &larr; <span className="hidden md:inline">Back</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="space-x-4 mt-8">
                <label
                  htmlFor="isPremiumCheckbox"
                  className="mt-10 mb-2 text-lg font-bold"
                >
                  <input
                    name="isPremiumCheckbox"
                    type="checkbox"
                    checked={isPremium}
                    onChange={() => setIsPremium(!isPremium)}
                    className="mr-2"
                  />
                  Premium Post
                </label>
                <label
                  htmlFor="isFeaturedCheckbox"
                  className="mt-10 mb-2 text-lg font-bold"
                >
                  <input
                    name="isFeaturedCheckbox"
                    type="checkbox"
                    checked={isFeatured}
                    onChange={() => setIsFeatured(!isFeatured)}
                    className="mr-2"
                  />
                  Featured Post
                </label>
              </div>
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
                className="mt-2 w-auto md:w-[24rem]"
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
              <label htmlFor="body" className="mt-10 text-lg">
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
