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
  let linkUrl = 'pending';
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  );

  if (paymentIntent.metadata.tripId == null) return notFound();

  const trip = await db.trip.findUnique({
    where: { id: paymentIntent.metadata.tripId },
  });

  if (trip == null) return notFound();

  const isSuccess = paymentIntent.status === 'succeeded';
  //TODO: Can't get this to build in Vercel - temp
  // const getDownloadId = await createDownloadVerification(trip.id);
  // linkUrl = `/trips/download/${getDownloadId}`;

  return (
    <div className='max-w-5xl w-full mx-auto space-y-8'>
      <h1 className='text-4xl font-bold'>
        {isSuccess ? 'Success!' : 'Error!'}
      </h1>
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
          <h1 className='text-2xl font-bold'>{trip.name}</h1>
          <div className='line-clamp-3 text-muted-foreground'>
            {trip.description}
          </div>
          {/* <Button className='mt-4' size='lg' asChild>
            {isSuccess && linkUrl !== 'pending' ? (
              <a href={linkUrl}>Download</a>
            ) : (
              <Link href={`/trips/${trip.id}/purchase`}>
                {linkUrl === 'pending' ? 'Pending' : 'Try Again'}
              </Link>
            )}
          </Button> */}
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
