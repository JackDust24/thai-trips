'use client';
import { createPaymentIntent } from '@/actions/orders';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatter';
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';

const IS_PROD_ENV = process.env.NODE_ENV === 'production';

export function Form({
  priceInBaht,
  tripId,
}: {
  priceInBaht: number;
  tripId: string;
}) {
  const stripe = useStripe(); // returns a reference to the Stripe instance
  const elements = useElements(); // pass the payment information collected by the Payment Element to the Stripe API
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (stripe == null || elements == null || email == null) return;
    setIsLoading(true);

    // Submit more via Stripe
    const formSubmit = await elements.submit();
    if (formSubmit.error != null) {
      setErrorMessage(formSubmit.error.message);
      setIsLoading(false);
      return;
    }

    // tracks the process of collecting a payment
    const paymentIntent = await createPaymentIntent(email, tripId);
    if (paymentIntent.error != null) {
      setErrorMessage(paymentIntent.error);
      setIsLoading(false);
      return;
    }

    stripe
      .confirmPayment({
        elements,
        clientSecret: paymentIntent.clientSecret,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unknown error occurred');
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className='shadow-2xl'>
        <CardHeader>
          <CardTitle>Trip Cost = {formatCurrency(priceInBaht)}</CardTitle>
          <CardDescription className='text-destructive'>
            {errorMessage && <div>{errorMessage}</div>}
            <div className='text-blue-700'>
              <p className='font-bold text-xl'>
                This site is a currently a demo - no real payments.
              </p>
              <p className='font-semibold text-lg'>
                Use 4242 4242 4242 4242 as the card number with any random
                numbers for the rest of the fields.
              </p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className='mt-4'>
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-4'>
          <Button
            className='w-1/3 mx-auto'
            size='lg'
            variant={'focused'}
            disabled={
              IS_PROD_ENV || stripe == null || elements == null || isLoading
            }
          >
            {isLoading
              ? 'Purchasing...'
              : `Purchase - ${formatCurrency(priceInBaht)}`}
          </Button>
          {IS_PROD_ENV && (
            <h1 className='text-red-600 mx-auto'>
              This is a test account and will not process real payments.
            </h1>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
