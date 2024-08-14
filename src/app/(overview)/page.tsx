import { lusitana } from '@/app/ui/fonts';
import { ItemGridSection } from './_components/ItemGridSection';
import { cache } from '@/lib/cache';
import db from '@/database/database';
import { MetaHead } from './_components/MetaHead';
import { HomeHero } from './_components/HomeHero';
import ItemSuspense from './_components/ItemGridSuspense';

const getMostPopularTrips = cache(
  () => {
    return db.trip.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: 'desc' } },
      take: 6,
    });
  },
  ['/', 'getMostPopularTrips'],
  { revalidate: 30 }
);

const getNewestTrips = cache(
  () => {
    return db.trip.findMany({
      where: { isAvailableForPurchase: false },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });
  },
  ['/', 'getNewestTrips'],
  { revalidate: 30 }
);

export default function Home() {
  return (
    <>
      <MetaHead />
      <main className='flex min-h-screen flex-col w-full h-40'>
        <HomeHero />
        <div className='z-10 border-2 rounded-xl p-4 w-full max-w-5xl mx-auto items-center space-y-8 flex-col justify-between gap-10 font-mono text-sm lg:flex'>
          <p
            className={`${lusitana.className} text-center text-2xl mb-4 text-gray-800 antialiased md:text-3xl md:leading-normal`}
          >
            Hiking Trips Available
          </p>
          <ItemGridSection title='Most Popular Trips'>
            <ItemSuspense itemGridFetcher={getMostPopularTrips} />
          </ItemGridSection>
          <ItemGridSection title='New Trips Coming Soon' itemsAvailable={false}>
            <ItemSuspense
              itemGridFetcher={getNewestTrips}
              itemsAvailable={false}
            />
          </ItemGridSection>
        </div>
      </main>
    </>
  );
}
