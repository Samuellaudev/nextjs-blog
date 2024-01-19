import readingDuration from 'reading-duration';

export const readingTime = (body) =>
  readingDuration(body, {
    emoji: 'open_book',
  });

export const formatDate = (date) => new Date(date).toDateString();

export const modifiedImageName = (id, imageName) => {
  return `${id}&img=${imageName}`;
};

export const originalImageName = (imageName = '') => {
  if (imageName.includes('&img=')) {
    return imageName.split('&img=')[1];
  }

  return imageName;
};

export const StatusIndicator = ({ status, isTrue, trueColor, falseColor }) => {
  const renderStatus = (isTrue) => (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-${
        isTrue ? trueColor : 'red-500'
      } bg-${isTrue ? trueColor : 'red-100/60'} dark:bg-gray-800`}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={isTrue ? 'M10 3L4.5 8.5L2 6' : 'M9 3L3 9M3 3L9 9'}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  return renderStatus(isTrue);
};
