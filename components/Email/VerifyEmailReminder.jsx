import React from 'react';

const VerifyEmailReminder = ({ pathname, userInfo }) => {
  const pagesToBeChecked = ['/dashboard', '/edit-post', '/new-post'];
  const isPathIncluded = pagesToBeChecked.some((page) =>
    pathname.includes(page),
  );

  if (userInfo && !userInfo.isVerified && isPathIncluded) {
    return (
      <div className="fixed left-1/4 right-1/4 mt-4 p-2 text-center bg-primary-500 text-white border shadow-md rounded-md opacity-80 dark:opacity-90">
        You won&apos;t be able to make any changes until you verify your email!
      </div>
    );
  }

  return null;
};

export default VerifyEmailReminder;
