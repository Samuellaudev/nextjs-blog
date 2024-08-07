// Contact Section
export const socialLinks = [
  {
    href: 'https://github.com/',
    src: '/images/icon-github.svg',
    alt: 'Github Icon',
  },
  {
    href: 'https://www.linkedin.com/',
    src: '/images/icon-linkedin.svg',
    alt: 'Linkedin Icon',
  },
  {
    href: 'https://www.instagram.com/',
    src: '/images/icon-instagram.svg',
    alt: 'Instagram',
  },
];

// Navbar
export const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'Blog', path: '/blog?search=&pageNumber=1' },
  { title: 'Login', path: '/login' },
  { title: 'Contact', path: '/contact' },
];

// API path
export const SEND_URL = '/api/send';
export const USERS_URL = '/api/users';
export const POSTS_URL = '/api/posts';
export const EMAILS_URL = '/api/emails';
// export const AWS_S3_GET_URL = '/api/aws-s3';
// export const AWS_S3_UPLOAD_URL = '/api/aws-s3/upload';
export const IMAGE_UPLOAD_URL = '/api/cloudinary/upload';

// EditOrAddNewPost
export const fieldMap = {
  'new-post': {
    title: 'Add New Post',
    submitButton: 'Add',
    successMessage: 'Post created successfully',
    errorMessage: 'Unable to create post',
  },
  'edit-post': {
    title: 'Edit Post',
    submitButton: 'Edit',
    successMessage: 'Post edited successfully',
    errorMessage: 'Unable to edit post',
  },
};

// Page path
export const blogPage = '/blog?search=&pageNumber=1';
export const dashboardPage = '/dashboard?search=&pageNumber=1';
