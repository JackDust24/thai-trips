'use client';

import { lusitana } from '@/app/ui/fonts';
import { Hero } from '@/components/Hero';

//TODO: Set up page
export default function MyOrdersPage() {
  //TODO: WHen properly set up implement this:
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/api/auth/signin?callbackUrl=orders');
  //     // redirect('/');
  //   },
  // });

  return (
    <div className='mb-10'>
      <Hero className='md:h-[14rem] bg-tripsBlue' showImage={false}>
        <div className='flex flex-col z-10 items-center justify-center w-full h-full gap-4'>
          <h1
            className={`${lusitana.className} text-3xl text-primary-foreground font-bold antialiased md:text-5xl md:leading-normal`}
          >
            Page Under construction
          </h1>
        </div>
      </Hero>
    </div>
  );
}
