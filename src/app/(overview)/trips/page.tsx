import { TripCard, TripCardSkeleton } from '@/components/TripCard';
import { Suspense } from 'react';
import { Trip } from '@/types/types';
import db from '@/database/database';
import { cache } from '@/lib/cache';

const getTrips = cache(() => {
  return db.trip.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: 'asc' },
  });
}, ['/trips', 'getTrips']);

export default function TripsPage() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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
  );
}

async function TripsSuspense() {
  const trips = await getTrips();

  return trips.map((trip) => <TripCard key={trip.id} {...trip} />);
}
