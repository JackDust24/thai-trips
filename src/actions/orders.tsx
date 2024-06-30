'use server';

import db from '@/database/database';
import Stripe from 'stripe';
import { z } from 'zod';
import data from '@/app/_mocks/mockItemData.json';

const emailSchema = z.string().email();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function createPaymentIntent(email: string, tripId: string) {
  const trip = await db.trip.findUnique({ where: { id: tripId } });

  if (trip == null) return { error: 'Unexpected Error' };

  const existingOrder = await db.order.findFirst({
    where: { user: { email }, tripId },
    select: { id: true },
  });

  if (existingOrder != null) {
    return {
      error: 'You have already purchased this trip.',
    };
  }

  const amount = trip.priceInBaht;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'THB',
    metadata: {
      tripId: trip.id,
    },
  });

  if (paymentIntent.client_secret == null) {
    return { error: 'Unknown error' };
  }

  return { clientSecret: paymentIntent.client_secret };
}

export async function emailOrderHistory(
  prevState: unknown,
  formData: FormData
): Promise<{ message?: string; error?: string }> {
  const result = emailSchema.safeParse(formData.get('email'));

  if (result.success === false) {
    return { error: 'Invalid email address' };
  }

  const user = await db.user.findUnique({
    where: { email: result.data },
    select: {
      email: true,
      orders: {
        select: {
          pricePaidInBaht: true,
          id: true,
          createdAt: true,
          trip: {
            select: {
              id: true,
              name: true,
              imagePath: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (user == null) {
    return {
      message:
        'Check your email to view your order history and download your trips.',
    };
  }

  user.orders.map(async (order) => {
    return {
      ...order,
      downloadVerificationId: (
        await db.downloadVerification.create({
          data: {
            expiresAt: new Date(Date.now() + 24 * 1000 * 60 * 60),
            tripId: order.trip.id,
          },
        })
      ).id,
    };
  });

  return {
    message: 'Download your trips.',
  };
}
