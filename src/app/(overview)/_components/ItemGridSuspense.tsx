import { TripCard } from '@/components/TripCard';
import { Trip } from '@/types/types';

async function ItemSuspense({
  itemGridFetcher,
}: {
  itemGridFetcher: () => Trip[];
}) {
  return itemGridFetcher().map((trip) => <TripCard key={trip.id} {...trip} />);
}

export default ItemSuspense;
