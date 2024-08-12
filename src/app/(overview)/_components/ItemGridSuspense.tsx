import { TripCard } from '@/components/TripCard';
import { Trip } from '@prisma/client';

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
