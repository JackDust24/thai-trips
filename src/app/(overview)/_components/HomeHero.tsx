import { lusitana } from '@/app/ui/fonts';
import { Hero } from '@/components/Hero';

export function HomeHero() {
  return (
    <div className='mb-10'>
      <Hero imagePath='/travel-hero.png' imageAlt='Travel Hero'>
        <div className='flex flex-col z-10 items-center justify-center w-full h-full gap-4'>
          <h1
            className={`${lusitana.className} md:text-5xl text-primary-foreground font-bold antialiased text-lg md:leading-normal`}
          >
            Welcome to Thai Trips Travel
          </h1>
          <p
            className={`${lusitana.className} text-lg font-semibold text-primary-foreground antialiased md:text-2xl`}
          >
            Your next adventure awaits
          </p>
        </div>
      </Hero>
    </div>
  );
}
