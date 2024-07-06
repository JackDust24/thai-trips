import { TripCard, TripCardSkeleton } from '@/components/TripCard';
import { Suspense } from 'react';
import data from '@/app/_mocks/mockItemData.json';
import { Trip } from '@/types/types';
import db from '@/database/database';
import { cache } from '@/lib/cache';

const getTrips = cache(() => {
  return db.trip.findMany({
    where: { isAvailableForPurchase: false },
    orderBy: { name: 'asc' },
  });
}, ['/trips', 'getTrips']);

const getMockTrips = (): Trip[] => {
  return data.trips.filter((trip) => {
    return trip.isAvailableForPurchase === true;
  }) satisfies Trip[];
};

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
  console.log(trips);
  // Use Mock if trips are empty
  if (!Array.isArray(trips) || !trips.length) {
    const mockTrips = getMockTrips();
    return mockTrips.map((trip) => <TripCard key={trip.id} {...trip} />);
  }
  return trips.map((trip) => <TripCard key={trip.id} {...trip} />);
}
