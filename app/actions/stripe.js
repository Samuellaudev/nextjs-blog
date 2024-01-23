'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import { stripe } from '@/lib/stripe';

async function createCheckoutSession(data) {
  const userId = data.get('userId');

  const checkoutSession = await stripe.checkout.sessions.create({
    client_reference_id: userId,
    mode: 'payment',
    submit_type: 'pay',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Premium Pro Subscription',
          },
          unit_amount: 100,
        },
      },
    ],
    success_url: `${headers().get(
      'origin',
    )}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${headers().get('origin')}/checkout`,
  });

  redirect(checkoutSession.url);
}

export { createCheckoutSession };
