import { TripCard, TripCardSkeleton } from '@/components/TripCard';
import { Suspense } from 'react';
import { Trip } from '@/types/types';
import db from '@/database/database';
import { cache } from '@/lib/cache';
import { Hero } from '@/components/Hero';
import { lusitana } from '@/app/ui/fonts';
import { TripsHero } from './_components/TripsHero';

const getTrips = cache(
  () => {
    return db.trip.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { name: 'asc' },
    });
  },
  ['/trips', 'getTrips'],
  { revalidate: 30 }
);

export default function TripsPage() {
  return (
    <>
      <TripsHero />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-8'>
        <Suspense
          fallback={
            <>
              <TripCardSkeleton />
              <TripCardSkeleton />
              <TripCardSkeleton />
              <TripCardSkeleton />
              <TripCardSkeleton />
              <TripCardSkeleton />
            </>
          }
        >
          <TripsSuspense />
        </Suspense>
      </div>
    </>
  );
}

async function TripsSuspense() {
  const trips = await getTrips();

  return trips.map((trip) => (
    <TripCard key={trip.id} {...trip} canPurchase className='md:w-full' />
  ));
}
