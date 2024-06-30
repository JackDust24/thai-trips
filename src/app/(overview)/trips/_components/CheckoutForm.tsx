'use client';

import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { Elements } from '@stripe/react-stripe-js';
import { Form } from './Form';
import { formatCurrency } from '@/lib/formatter';

type CheckoutFormProps = {
  trip: {
    id: string;
    imagePath: string;
    name: string;
    priceInBaht: number;
    description: string;
  };
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export function CheckoutForm({ trip }: CheckoutFormProps) {
  const amount = trip.priceInBaht;

  return (
    <div className='max-w-5xl w-full mx-auto space-y-8'>
      <div className='flex gap-4 items-center'>
        <div className='aspect-video flex-shrink-0 w-1/3 relative'>
          <Image
            src={trip.imagePath}
            fill
            alt={trip.name}
            className='object-cover'
          />
        </div>
        <div>
          <div className='text-lg flex gap-4 items-baseline'>
            {formatCurrency(trip.priceInBaht)}
          </div>
          <h1 className='text-2xl font-bold'>{trip.name}</h1>
          <div className='line-clamp-3 text-muted-foreground'>
            {trip.description}
          </div>
        </div>
      </div>
      <Elements
        options={{ amount, mode: 'payment', currency: 'thb' }}
        stripe={stripePromise}
      >
        <Form priceInBaht={amount} tripId={trip.id} />
      </Elements>
    </div>
  );
}
