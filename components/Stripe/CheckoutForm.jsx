'use client';

import React, { useState } from 'react';
import { createCheckoutSession } from '@/app/actions/stripe';

const CheckoutForm = ({ data }) => {
  const { userId } = data;

  return (
    <form action={createCheckoutSession}>
      <div className="absolute text-center bg-white text-black p-4 w-80 rounded-md left-0 md:right-0 mx-auto bottom-1/3 z-10 ring-offset-2 ring-4 ring-gray-200">
        <p className="text-2xl font-semibold">Upgrade</p>
        <p className="my-4 mb-8 text-gray-500">
          Access premium content by upgrading to Pro user
        </p>
        <input name="userId" value={userId} className="hidden" />
        <button
          type="submit"
          className="border rounded-md p-2 w-full bg-primary-500 text-white hover:bg-white hover:text-primary-500 transition duration-200"
        >
          Upgrade
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
