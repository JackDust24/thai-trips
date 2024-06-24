import Image from 'next/image';
import Logo from '@/app/ui/logo';
import { lusitana } from '@/app/ui/fonts';
import { ItemGridSection } from './_components/ItemGridSection';
import data from '@/app/_mocks/mockItemData.json';
import { cache } from '@/lib/cache';
import { Product } from '@/types/types';

// const getMostPopularProducts = cache(
//   () => {
//       return db.product.findMany({
//         where: { isAvailableForPurchase: true },
//         orderBy: { orders: { _count: 'desc' } },
//         take: 6,
//       });
//   },
//   ['/', 'getMostPopularProducts'],
//   { revalidate: 60 * 60 * 24 }
// );

const getPopularItems = (): Product[] => {
  return data.products.filter((product) => {
    product.isAvailableForPurchase === true;
  }) satisfies Product[];
};

const getNewestItems = (): Product[] => {
  return data.products.slice(-3) satisfies Product[];
};

//   const getNewestProducts = cache(() => {
//     return db.product.findMany({
//       where: { isAvailableForPurchase: true },
//       orderBy: { createdAt: 'desc' },
//       take: 6,
//     });
//   }, ['/', 'getNewestProducts']);

export default function Home() {
  console.log(data.products);
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
        <ItemGridSection
          title='Newest'
          itemGridFetcher={getNewestItems}
        />
      </div>
    </main>
  );
}
