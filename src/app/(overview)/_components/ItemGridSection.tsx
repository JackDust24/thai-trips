import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ItemSuspense from './ItemGridSuspense';
import { Trip } from '@prisma/client';
import { TripCardSkeleton } from '@/components/TripCard';
import { Trip as MockTrip } from '@/types/types';

type ItemGridSectionProps = {
  title: string;
  itemGridFetcher: () => Promise<Trip[]> | MockTrip[];
};

export function ItemGridSection({
  itemGridFetcher,
  title,
}: ItemGridSectionProps) {
  return (
    <div className='space-y-4'>
      <div className='flex gap-4'>
        <h2 className='text-3xl font-bold'>{title}</h2>
        <Button variant='outline' asChild>
          <Link href='/trips' className='space-x-2'>
            <span>View All</span>
            <ArrowRight className='size-4' />
          </Link>
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Suspense
          fallback={
            <>
              <TripCardSkeleton />
              <TripCardSkeleton />
              <TripCardSkeleton />
            </>
          }
        >
          <ItemSuspense itemGridFetcher={itemGridFetcher} />
        </Suspense>
      </div>
    </div>
  );
}
