export interface Post {
  _id: string;
  title: string;
  description: string;
  body: string;
  image: {
    name: string;
    type: string;
    lastModified: number;
  };
  isFeatured: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
