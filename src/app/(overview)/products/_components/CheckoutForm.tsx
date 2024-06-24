'use client';

import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { Elements } from '@stripe/react-stripe-js';
import { Form } from './Form';
import { formatCurrency } from '@/lib/formatter';

type CheckoutFormProps = {
  product: {
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

export function CheckoutForm({ product }: CheckoutFormProps) {
  const amount = product.priceInBaht;

  return (
    <div className='max-w-5xl w-full mx-auto space-y-8'>
      <div className='flex gap-4 items-center'>
        <div className='aspect-video flex-shrink-0 w-1/3 relative'>
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className='object-cover'
          />
        </div>
        <div>
          <div className='text-lg flex gap-4 items-baseline'>
            {formatCurrency(product.priceInBaht)}
          </div>
          <h1 className='text-2xl font-bold'>{product.name}</h1>
          <div className='line-clamp-3 text-muted-foreground'>
            {product.description}
          </div>
        </div>
      </div>
      <Elements
        options={{ amount, mode: 'payment', currency: 'thb' }}
        stripe={stripePromise}
      >
        <Form priceInBaht={amount} productId={product.id} />
      </Elements>
    </div>
  );
}
