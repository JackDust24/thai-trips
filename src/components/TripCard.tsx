import { formatCurrency } from '@/lib/formatter';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type TripCardProps = {
  id: string;
  name: string;
  priceInBaht: number;
  description: string;
  imagePath: string;
  canPurchase?: boolean;
  className?: string;
};

export function TripCard({
  id,
  name,
  priceInBaht,
  description,
  imagePath,
  canPurchase = true,
  className,
}: TripCardProps) {
  return (
    <Card className='flex overflow-hidden flex-col'>
      <div
        className={cn(
          'relative w-full md:w-[20rem] h-auto aspect-video',
          className
        )}
      >
        <Image src={imagePath} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInBaht)}</CardDescription>
      </CardHeader>
      <CardContent className='flex-grow'>
        <p className='line-clamp-4'>{description}</p>
      </CardContent>

      <CardFooter>
        {canPurchase ? (
          <Button asChild size='lg' className='w-full'>
            <Link href={`/trips/${id}/purchase`}>Purchase</Link>
          </Button>
        ) : (
          <p className='line-clamp-4 text-red-500'>Coming soon </p>
        )}
      </CardFooter>
    </Card>
  );
}

export function TripCardSkeleton() {
  return (
    <Card className='overflow-hidden flex flex-col animate-pulse'>
      <div className='w-full md:w-[20rem] aspect-video bg-gray-300' />
      <CardHeader>
        <CardTitle>
          <div className='w-3/4 h-6 rounded-full bg-gray-300' />
        </CardTitle>
        <CardDescription>
          <div className='w-1/2 h-4 rounded-full bg-gray-300' />
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='w-full h-4 rounded-full bg-gray-300' />
        <div className='w-full h-4 rounded-full bg-gray-300' />
        <div className='w-3/4 h-4 rounded-full bg-gray-300' />
      </CardContent>
      <CardFooter>
        <Button className='w-full' disabled size='lg'></Button>
      </CardFooter>
    </Card>
  );
}
