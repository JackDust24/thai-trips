import { lusitana } from '@/app/ui/fonts';
import { Hero } from '@/components/Hero';

export function TripsHero() {
  return (
    <div className='mb-10'>
      <Hero imagePath='/travel-hero.png' imageAlt='Travel Hero'>
        <div className='flex flex-col z-10 items-center justify-center w-full h-full gap-4'>
          <h1
            className={`${lusitana.className} text-3xl text-primary-foreground font-bold antialiased md:text-5xl md:leading-normal`}
          >
            Choose from the best trips
          </h1>
          <p
            className={`${lusitana.className} text-lg font-semibold text-primary-foreground antialiased md:text-2xl`}
          >
            Please select Purchase
          </p>
        </div>
      </Hero>
    </div>
  );
}
