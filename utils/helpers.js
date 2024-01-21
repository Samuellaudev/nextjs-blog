import readingDuration from 'reading-duration';

export const readingTime = (body) =>
  readingDuration(body, {
    emoji: 'open_book',
  });

export const formatDate = (date = '') => {
  let dateObject = new Date(date);

  if (isNaN(dateObject.getTime())) {
    return null;
  }

  return dateObject.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const modifiedImageName = (id, imageName) => {
  return `${id}&img=${imageName}`;
};

export const originalImageName = (imageName = '') => {
  if (imageName.includes('&img=')) {
    return imageName.split('&img=')[1];
  }

  return imageName;
};
