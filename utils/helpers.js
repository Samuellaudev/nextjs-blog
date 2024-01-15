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
