import 'server-only';

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'nextjs-blog',
    url: 'https://nextjs-blog-samuellau.vercel.app/',
  },
});
