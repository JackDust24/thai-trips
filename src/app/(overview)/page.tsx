import Image from 'next/image';
import Logo from '@/app/ui/logo';
import { lusitana } from '@/app/ui/fonts';
import { ItemGridSection } from './_components/ItemGridSection';
import data from '@/app/_mocks/mockItemData.json';
import { cache } from '@/lib/cache';
import { Trip as MockTrip } from '@/types/types';
import { Trip } from '@prisma/client';
import db from '@/database/database';

//TODO: Implement in next commit - when Admin added
const getMostPopularTrips = cache(
  () => {
    return db.trip.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: 'desc' } },
      take: 6,
    });
  },
  ['/', 'getMostPopularTrips'],
  { revalidate: 60 * 60 * 24 }
);

const getNewestTrips = cache(() => {
  return db.trip.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });
}, ['/', 'getNewestTrips']);

const getPopularItems = (): MockTrip[] => {
  return data.trips.filter((trip) => {
    trip.isAvailableForPurchase === true;
  }) satisfies MockTrip[];
};

const getNewestItems = (): MockTrip[] => {
  return data.trips.slice(-3) satisfies MockTrip[];
};

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col px-8'>
      <div className='flex relative h-20 mb-10 shrink-0 items-end rounded-lg bg-[#2962FF] p-4 md:h-80 shadow-xl'>
        <Logo />
        <Image
          src='/travel-hero.png'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          className='absolute hidden md:block top-6 overflow-hidden p-1 opacity-70 rounded-xl shadow-inner'
          alt='Screenshots of the dashboard project showing desktop version'
        />
      </div>
      <div className='z-10 w-full max-w-5xl items-start gap-8 flex-col justify-between font-mono text-sm lg:flex'>
        <p
          className={`${lusitana.className} text-xl text-gray-800 antialiased md:text-3xl md:leading-normal`}
        >
          Hello Welcome Back
        </p>
        <ItemGridSection
          title='Most Popular'
          itemGridFetcher={getPopularItems}
        />
        <ItemGridSection title='Newest' itemGridFetcher={getNewestItems} />
      </div>
    </main>
  );
}
