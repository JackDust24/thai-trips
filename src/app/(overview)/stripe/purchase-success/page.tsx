import { Button } from '@/components/ui/button';
import db from '@/database/database';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Stripe from 'stripe';
import data from '@/app/_mocks/mockItemData.json';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );

  if (paymentIntent.metadata.tripId == null) return notFound();

  //TODO: Add this when Admin implemented
  const trip = await db.trip.findUnique({
    where: { id: paymentIntent.metadata.tripId },
  });

  const mockTrip = data.trips.find(
    (trip) => trip.id === paymentIntent.metadata.tripId
  );

  if (mockTrip == null) return notFound();

  const isSuccess = paymentIntent.status === 'succeeded';

  return (
    <div className='max-w-5xl w-full mx-auto space-y-8'>
      <h1 className='text-4xl font-bold'>
        {isSuccess ? 'Success!' : 'Error!'}
      </h1>
      <div className='flex gap-4 items-center'>
        <div className='aspect-video flex-shrink-0 w-1/3 relative'>
          <Image
            src={mockTrip.imagePath}
            fill
            alt={mockTrip.name}
            className='object-cover'
          />
        </div>
        <div>
          <h1 className='text-2xl font-bold'>{mockTrip.name}</h1>
          <div className='line-clamp-3 text-muted-foreground'>
            {mockTrip.description}
          </div>
          <Button className='mt-4' size='lg' asChild>
            {isSuccess ? (
              <a
                href={`/trips/download/${await createDownloadVerification(
                  mockTrip.id
                )}`}
              >
                Download
              </a>
            ) : (
              <Link href={`/trips/${mockTrip.id}/purchase`}>Try Again</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

async function createDownloadVerification(tripId: string) {
  return (
    await db.downloadVerification.create({
      data: {
        tripId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
  ).id;
}
