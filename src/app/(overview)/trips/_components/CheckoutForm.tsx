'use client';

import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { Elements } from '@stripe/react-stripe-js';
import { Form } from './Form';
import { formatCurrency } from '@/lib/formatter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MAX_PERSONS_PER_TRIP } from '@/lib/consttants';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

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

const TRIP_ITEMS = Array.from(
  { length: MAX_PERSONS_PER_TRIP },
  (_, i) => i + 1
);

export function CheckoutForm({ trip }: CheckoutFormProps) {
  const [numPersons, setNumPersons] = useState<number>(1);
  const [amount, setAmount] = useState(trip.priceInBaht);

  const handleAmountChange = (_numPersons: number) => {
    setAmount(trip.priceInBaht * _numPersons);
    setNumPersons(_numPersons);
  };
  return (
    <div className='max-w-5xl w-full mx-auto space-y-8 my-8'>
      <div className='flex bg-[#FFF] gap-4 justify-start border-solid border-2'>
        <div className='aspect-video flex-shrink-0 w-1/3 relative'>
          <Image
            src={trip.imagePath}
            fill
            alt={trip.name}
            className='object-cover'
          />
        </div>
        <div className='w-full p-6 space-y-2'>
          <h1 className='text-2xl font-bold'>Name of Trip: {trip.name}</h1>
          <div className='flex justify-between'>
            <div className='text-lg flex gap-4 items-baseline'>
              Cost: {formatCurrency(amount)} &nbsp; {numPersons} persons
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='focused'>Add People</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {TRIP_ITEMS.map((number) => (
                  <DropdownMenuItem
                    key={number}
                    onClick={() => handleAmountChange(number)}
                  >
                    {number}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='line-clamp-3 text-muted-foreground'>
            Details: {trip.description}
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
