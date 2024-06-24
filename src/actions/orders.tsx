'use server';

// import db from '@/db/db';
import Stripe from 'stripe';
import { z } from 'zod';
import data from '@/app/_mocks/mockItemData.json';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const getProduct = (id: string) => {
  return data.products.find((product) => product.id === id);
};

const getOrder = (productId: string, email: string) => {
  const user = data.users.find((user) => user.email === email);
  return data.orders.find(
    (order) => order.userId === user?.id && order.productId === productId
  );
};

export async function createPaymentIntent(email: string, productId: string) {
  const product = getProduct(productId);

  if (product == null) return { error: 'Unexpected Error' };

  const orderExists = getOrder(productId, email);

  if (orderExists != null) {
    return {
      error: 'You have already purchased this product.',
    };
  }

  const amount = product.priceInBaht;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'THB',
    metadata: {
      productId: product.id,
    },
  });

  if (paymentIntent.client_secret == null) {
    return { error: 'Unknown error' };
  }

  return { clientSecret: paymentIntent.client_secret };
}
