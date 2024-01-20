'use client';
import { POSTS_URL, USERS_URL, blogPage } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { readingTime, formatDate } from '@/utils/helpers';
import Pagination from '@/components/Pagination';
import Tabs from '@/components/Tabs';
import UsersTable from '@/components/Users/UsersTable';
import Loading from './Loading';
import styles from './postsStyles.module.css';
import { ToastContainer, toast } from 'react-toastify';

const Posts = ({ pageHeading }) => {
  const [postsData, setPostsData] = useState({ page: 1, pages: 1, posts: [] });
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const searchParams = useSearchParams();
  const pageNumber = searchParams.get('pageNumber');
  const search = searchParams.get('search');

  const router = useRouter();

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${POSTS_URL}?search=${search}&pageNumber=${pageNumber}`,
      );
      const postsData = await response.data;

      setPostsData(postsData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${USERS_URL}`);
      const usersData = await response.data;

      setUsersData(usersData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search, pageNumber]);

  useEffect(() => {
    if (selectedIndex === 0) {
      fetchUsers();
    }
  }, [selectedIndex]);

  const handleAddNewPost = () => router.push('/new-post');

  const handleEditPost = (id) => router.push(`/edit-post/${id}`);

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${POSTS_URL}/${id}`);

      fetchPosts();
      toast.success('Deleted post successfully');
    } catch (error) {
      console.log('Delete error:', error);
      toast.error('Fail to delete post');
    }
  };

  const DashboardOrPosts = () => {
    return (
      <div className="flex flex-row items-baseline justify-between">
        {pageHeading === 'Dashboard' && (
          <>
            <h1 className={`${styles.tabs__heading} ${styles.dashboard}`}>
              {pageHeading}
            </h1>
            <div
              role="button"
              aria-label="Add new post"
              onClick={handleAddNewPost}
              className={`${selectedIndex === 1 ? 'block' : 'hidden'} ${
                styles.light_theme_add_new_btn
              } dark:hover:bg-white dark:hover:text-black`}
            >
              + <span className="hidden md:inline">Add new</span>
            </div>
          </>
        )}
        {pageHeading === 'Latest Posts' && search.length > 0 && (
          <>
            <h1 className={`${styles.tabs__heading}`}>{pageHeading}</h1>
            <button
              onClick={() => router.push(`${blogPage}`)}
              className={`${styles.light_theme_back_btn} dark:border dark:border-white dark:hover:bg-white dark:hover:text-black`}
            >
              &larr; <span className="hidden md:inline">Back</span>
            </button>
          </>
        )}
      </div>
    );
  };

  const Users = () => <h1 className={`${styles.tabs__heading} `}>Users</h1>;

  const UsersPanel = () => {
    return <UsersTable usersData={usersData} />;
  };

  const DashboardPanel = () => {
    return isLoading ? (
      <Loading pageHeading={pageHeading} />
    ) : (
      <>
        <ul className={styles.article_ul}>
          {postsData?.posts?.map((post) => (
            <li key={post._id}>
              <Link
                href={`/blog/${post._id}`}
                className="flex flex-row justify-between "
              >
                <div className="post-title">
                  <p className={styles.article_list__title}>{post.title}</p>
                  <p className="text-base text-gray-600 dark:text-gray-300">
                    {post?.description}
                  </p>
                </div>
                {pageHeading === 'Latest Posts' && (
                  <p className={styles.article_list__date}>
                    {formatDate(post.updatedAt)}
                    <p className="">{readingTime(post?.body)}</p>
                  </p>
                )}
                {pageHeading === 'Dashboard' && (
                  <div className="flex flex-col">
                    <p className={styles.article_list__date}>
                      Updated at: {formatDate(post.updatedAt)}
                    </p>
                    <p className={styles.article_list__date}>
                      Created at: {formatDate(post.createdAt)}
                    </p>
                  </div>
                )}
              </Link>
              {pageHeading === 'Dashboard' && (
                <div className="flex flex-row justify-between">
                  <div className="flex text-xs md:text-sm space-x-2 md:space-x-4 mb-4 items-center">
                    {post.isPremium ? (
                      <span className="bg-secondary-700 p-1 px-3 rounded-full text-white">
                        Premium
                      </span>
                    ) : (
                      <></>
                    )}
                    {post.isFeatured ? (
                      <span className="bg-primary-400 p-1 px-3 rounded-full text-white">
                        Featured
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleEditPost(post._id)}
                      className={`${styles.light_theme_btn} bg-cyan-700 hover:text-cyan-700 hover:ring-cyan-700 dark:hover:ring-0`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePost(post._id)}
                      className={`${styles.light_theme_btn} bg-red-500 hover:text-red-500 hover:ring-red-500 dark:hover:ring-0`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <Pagination
          page={postsData?.page}
          pages={postsData?.pages}
          search={search}
          pageType={pageHeading}
        />
      </>
    );
  };

  return (
    <div className="container md:mt-20 mx-auto px-12 text-[#565b5f] dark:text-white dark:bg-black">
      {pageHeading === 'Latest Posts' && (
        // Render header and back button for 'Latest Posts'
        <div className="flex flex-row items-baseline justify-between">
          <h1 className={`${styles.tabs__heading}`}>{pageHeading}</h1>
          {pageHeading === 'Latest Posts' && search.length > 0 && (
            <button
              onClick={() => router.push(`${blogPage}`)}
              className={`${styles.light_theme_back_btn} dark:border dark:border-white dark:hover:bg-white dark:hover:text-black`}
            >
              &larr; <span className="hidden md:inline">Back</span>
            </button>
          )}
        </div>
      )}
      {pageHeading !== 'Latest Posts' && (
        // Render Tabs and Content based on the pageHeading
        <Tabs
          tabListClass={`flex flex-col  md:flex-row items-start`}
          tab1={Users}
          tab2={DashboardOrPosts}
          tab1Class={`mr-1 md:mr-4 ${
            selectedIndex === 0
              ? 'text-[#565b5f] dark:text-white focus:outline-none'
              : 'text-[#ADB7BE]'
          }`}
          tab2Class={`w-full ${
            selectedIndex === 1
              ? 'text-[#565b5f] dark:text-white focus:outline-none'
              : 'text-[#ADB7BE]'
          }`}
          content1={UsersPanel}
          content2={DashboardPanel}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      )}
      {pageHeading === 'Latest Posts' &&
        // Render post list and pagination for 'Latest Posts'
        (isLoading ? (
          <Loading pageHeading={pageHeading} />
        ) : (
          <>
            <ul className={styles.article_ul}>
              {postsData?.posts?.map((post) => (
                <li key={post._id}>
                  <Link
                    href={`/blog/${post._id}`}
                    className="flex flex-row justify-between"
                  >
                    <div className="flex flex-col">
                      <div className="post-title">
                        <p className={styles.article_list__title}>
                          {post.title}
                        </p>
                        <p className="mb-2 md:mb-0 text-base text-gray-600 dark:text-gray-300">
                          {post?.description}
                        </p>
                      </div>
                      {post.isPremium || post.isFeatured ? (
                        <div className="flex text-xs md:text-sm space-x-2 md:space-x-4 mb-3 md:mb-0 mt-2 md:mt-4 items-center">
                          {post.isPremium ? (
                            <span className="bg-secondary-800 p-1 px-3 rounded-full text-white">
                              Premium
                            </span>
                          ) : (
                            <></>
                          )}
                          {post.isFeatured ? (
                            <span className="bg-primary-500 p-1 px-3 rounded-full text-white">
                              Featured
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    {pageHeading === 'Latest Posts' && (
                      <div className="flex flex-col text-left md:text-right">
                        <p className={styles.article_list__date}>
                          {formatDate(post.updatedAt)}
                        </p>
                        <p className={styles.article_reading_time}>
                          {readingTime(post?.body)}
                        </p>
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <Pagination
              page={postsData?.page}
              pages={postsData?.pages}
              search={search}
              pageType={pageHeading}
            />
          </>
        ))}
      <ToastContainer />
    </div>
  );
};

export default Posts;
