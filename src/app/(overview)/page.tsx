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

      {/* Main content area with full screen height */}
      <main className='flex flex-col min-h-screen w-full'>
        <HomeHero />

        <div className='border-2 rounded-xl w-full p-4'>
          <div className='z-10 w-full max-w-5xl mx-auto space-y-8 flex flex-col justify-start text-sm'>
            <p
              className={`text-center text-2xl mb-4 text-gray-800 antialiased md:text-3xl md:leading-normal`}
            >
              Hiking Trips Available
            </p>

            <ItemGridSection title='Most Popular Trips'>
              <ItemSuspense itemGridFetcher={getMostPopularTrips} />
            </ItemGridSection>

            <ItemGridSection
              title='New Trips Coming Soon'
              itemsAvailable={false}
            >
              <ItemSuspense
                itemGridFetcher={getNewestTrips}
                itemsAvailable={false}
              />
            </ItemGridSection>
          </div>
        </div>
      </main>
    </>
  );
}
