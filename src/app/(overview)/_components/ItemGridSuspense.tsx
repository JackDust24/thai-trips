import { TripCard } from '@/components/TripCard';
import { Trip } from '@prisma/client';

async function ItemSuspense({
  itemGridFetcher,
  itemsAvailable = true,
}: {
  itemGridFetcher: () => Promise<Trip[]>;
  itemsAvailable?: boolean;
}) {
  return (await itemGridFetcher()).map((trip) => (
    <TripCard key={trip.id} {...trip} canPurchase={itemsAvailable} />
  ));
}

export default ItemSuspense;
