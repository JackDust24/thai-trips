import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TripCardSkeleton } from '@/components/TripCard';

type ItemGridSectionProps = {
  title: string;
  itemsAvailable?: boolean;
  children: React.ReactNode;
};

export function ItemGridSection({
  children,
  title,
  itemsAvailable = true,
}: ItemGridSectionProps) {
  return (
    <div className='space-y-4'>
      <div className='flex gap-4'>
        <h2 className='text-3xl font-bold'>{title}</h2>
        {itemsAvailable && (
          <Button variant='focused' asChild>
            <Link href='/trips' className='space-x-2 bg-hero text-black'>
              <span>View All</span>
              <ArrowRight className='size-4' />
            </Link>
          </Button>
        )}
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
          {children}
        </Suspense>
      </div>
    </div>
  );
}
