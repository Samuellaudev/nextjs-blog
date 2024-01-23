'use server';

import { revalidatePath } from 'next/cache';
import { USERS_URL } from '@/utils/constants';
import { stripe } from '@/lib/stripe';
import Logout from '@/components/Logout';

const frontendUrl = process.env.FRONTEND_URL;

const ResultPage = async ({ searchParams }) => {
  if (!searchParams.session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const checkoutSession = await stripe.checkout.sessions.retrieve(
    searchParams.session_id,
    {
      expand: ['line_items', 'payment_intent'],
    },
  );

  const paymentStatus = await checkoutSession.payment_status;
  const userId = await checkoutSession.client_reference_id;

  const upgradeUser = async () => {
    try {
      const res = await fetch(`${frontendUrl}${USERS_URL}/upgrade`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userId),
      });
    } catch (error) {
      console.error('Error upgrading user:', error);
    }
  };

  if (paymentStatus === 'paid') {
    await upgradeUser();
  }

  revalidatePath('/checkout/result', 'page');

  return (
    <div className="container mx-auto text-center flex flex-col px-12 md:mt-20 text-[#565b5f] dark:text-white">
      <h1 className="mt-40">Pro Membership Unlocked!</h1>
      <h3 className="text-base my-5 px-6">
        Please login again to see the premium content.
      </h3>
      <Logout
        content="Login"
        className="w-auto md:w-20 mx-auto p-3 font-sans font-bold text-white rounded-md bg-cyan-700 hover:text-cyan-700 hover:bg-white duration-200"
      />
    </div>
  );
};

export default ResultPage;
