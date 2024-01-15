import connectDB from '../lib/db.js';
// import users from './sampleData/users.js';
import posts from '../sampleData/posts.js';
// import User from './models/userModel.js';
import Post from '../models/postModel.js';
import colors from 'colors';

connectDB();

export const importData = async () => {
  try {
    await Post.deleteMany();
    // await User.deleteMany();

    // const createdUsers = await User.insertMany(users);

    // const adminUser = createdUsers[0]._id;

    const samplePosts = posts.map((post) => {
      return { ...post };
    });

    await Post.insertMany(samplePosts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

export const destroyData = async () => {
  try {
    await Post.deleteMany();
    // await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
