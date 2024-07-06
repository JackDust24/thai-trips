import { TripCard } from '@/components/TripCard';
import { Trip } from '@prisma/client';
import { Trip as MockTrip } from '@/types/types';

async function ItemSuspense({
  itemGridFetcher,
}: {
  itemGridFetcher: () => Promise<Trip[]>;
}) {
  return (await itemGridFetcher()).map((trip) => (
    <TripCard key={trip.id} {...trip} />
  ));
}

export default ItemSuspense;
