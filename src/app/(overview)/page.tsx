import Image from 'next/image';
import Logo from '@/app/ui/logo';
import { lusitana } from '@/app/ui/fonts';
import { ItemGridSection } from './_components/ItemGridSection';
import { cache } from '@/lib/cache';
import db from '@/database/database';

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
  const popularTrips = getMostPopularTrips();
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
          className={`${lusitana.className} text-xl mb-4 text-gray-800 antialiased md:text-3xl md:leading-normal`}
        >
          Please select a Trip
        </p>
        <ItemGridSection
          title='Most Popular'
          itemGridFetcher={getMostPopularTrips}
        />
        <ItemGridSection title='Newest' itemGridFetcher={getNewestTrips} />
      </div>
    </main>
  );
}
