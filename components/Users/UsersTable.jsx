'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '@/utils/helpers';
import styles from './usersTableStyles.module.css';

const UsersTable = ({ usersData = [] }) => {
  const [data, setData] = useState([]);
  const tableHeadName = ['Name', 'Id', 'Creation Date', 'Verified', 'Premium'];

  useEffect(() => {
    setData(usersData);
  }, [usersData]);

  const TableHead = () => (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        {tableHeadName?.map((item) => (
          <th
            key={item}
            scope="col"
            className="px-4 py-3.5 text-sm text-center font-normal rtl:text-right text-gray-500 dark:text-gray-400"
          >
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderVerificationStatus = (isVerified) =>
    isVerified ? (
      <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ) : (
      <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 3L3 9M3 3L9 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );

  const renderPremiumStatus = (isPremium) =>
    isPremium ? (
      <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ) : (
      <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 3L3 9M3 3L9 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );

  const TableBody = () => (
    <tbody className="text-center bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
      {data &&
        data.length > 0 &&
        data?.map((user) => (
          <tr key={user._id}>
            <td className={`${styles.item_style} dark:text-gray-300`}>
              {user.name}
            </td>
            <td className={`${styles.item_style} dark:text-gray-300`}>
              {user._id}
            </td>
            <td className={`${styles.item_style} dark:text-gray-300`}>
              {formatDate(user.createdAt)}
            </td>
            <td className={`${styles.item_style} dark:text-gray-300`}>
              {renderVerificationStatus(user.isVerified)}
            </td>
            <td className={`${styles.item_style} dark:text-gray-300`}>
              {renderPremiumStatus(user.isPremium)}
            </td>
          </tr>
        ))}
    </tbody>
  );

  return (
    <section className="container mx-auto mt-6">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle ">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <TableHead />
                <TableBody />
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsersTable;
