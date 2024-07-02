# Next.js CMS Blog with MongoDB

A serverless web application that utilizes Next.js and MongoDB to create a custom-built content management system for managing and publishing blog content.

![test](https://github.com/Samuellaudev/samuellaudev/blob/9837c53d8b21118b0ecd2335926f0249a585e004/public/images/projects/NextJs_v14_Blog_CMS_with_MongoDB.png?raw=true)

## 🔗 URL

[Next.js CMS Blog](https://nextjs-mongodb-cms.vercel.app/)

## 🚀 Features

- Show all posts in home page and blog page
- Add, edit or delete post in edit-mode (Admin only)
- Utilized Vercel's Serverless Functions to interact directly with MongoDB
- ~~Upload image using AWS S3 and retrieve it through presigned URLs~~
- Upload image using Cloudinary
- User management system using JWT authorization with HttpOnly Cookie
- Implementing Stripe payment gateway (Test Mode) for premium content access
- Dark Mode integration

More project details [here](https://www.samuellau.dev/projects/nextjs-blog-with-mongodb)

## 🛠 Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```

For detailed explanation on how things work, check out [Next.js docs](https://nextjs.org/docs).