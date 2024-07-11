'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency, formatNumber } from '@/lib/formatter';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Trip } from '@prisma/client';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import data from '@/app/_mocks/mockItemData.json';
import { addTrip, updateTrip } from '../../_actions/trips';

export function TripForm({ trip }: { trip?: Trip | null }) {
  const [error, action] = useFormState(
    trip == null ? addTrip : updateTrip.bind(null, trip.id),
    {}
  );
  const [location, setLocation] = useState<string | undefined>(trip?.location);
  const [numberPlaces, setNumberPlaces] = useState<number | undefined>(
    trip?.numberOfPlaces
  );
  const [priceInBaht, setPriceInBaht] = useState<number | undefined>(
    trip?.priceInBaht
  );

  return (
    <form action={action}>
      <div className='w-[700px] bg-[#C0C0C0] m-auto border-2 flex flex-col border-slate-600 p-8 space-y-8 shadow-xl'>
        <div className='space-y-2 '>
          <Label htmlFor='name'>Name</Label>
          <Input
            type='text'
            id='name'
            name='name'
            required
            className='border-solid border-2 w-80'
            placeholder='Name of Trip'
            defaultValue={trip?.name || ''}
          />
          {error.name && <div className='text-destructive'>{error.name}</div>}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='location'>Province</Label>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='secondary'>Choose Province</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='border border-solid'>
                {Object.entries(data.locations).map(([key, value]) => (
                  <DropdownMenuItem
                    onClick={() => setLocation(value.province)}
                    key={key}
                  >
                    {value.province}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <input type='hidden' name='location' value={location} />

          {error.name && <div className='text-destructive'>{error.name}</div>}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='description'>Description</Label>
          <Textarea
            id='description'
            name='description'
            required
            className='border-solid border-2 w-2/3'
            defaultValue={trip?.description}
            placeholder='Add details such as the itinerary'
          />
          {error.description && (
            <div className='text-destructive'>{error.description}</div>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='numberOfPlaces'>Number of persons allowed</Label>
          <Input
            type='number'
            id='numberOfPlaces'
            name='numberOfPlaces'
            className='border-solid border-2 w-40'
            placeholder='Max no. of persons'
            required
            value={numberPlaces}
            onChange={(e) =>
              setNumberPlaces(Number(e.target.value) || undefined)
            }
          />
          <div className='text-muted-foreground'>
            {formatNumber(numberPlaces || 0)}
          </div>
          {error.numberOfPlaces && (
            <div className='text-destructive'>{error.numberOfPlaces}</div>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='priceInBaht'>Price In Baht</Label>
          <Input
            type='number'
            id='priceInBaht'
            name='priceInBaht'
            className='border-solid border-2 w-40'
            required
            value={priceInBaht}
            onChange={(e) =>
              setPriceInBaht(Number(e.target.value) || undefined)
            }
          />
          <div className='text-muted-foreground'>
            {formatCurrency(priceInBaht || 0)}
          </div>
          {error.priceInBaht && (
            <div className='text-destructive'>{error.priceInBaht}</div>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='file'>Details of trip on file (optional)</Label>
          <Input
            type='file'
            id='file'
            name='file'
            className='border-solid border-2 w-80'
            placeholder='A flyer or brochure'
          />
          {trip?.tripDescPath != null && (
            <div className='text-muted-foreground'>{trip.tripDescPath}</div>
          )}
          {error.file && <div className='text-destructive'>{error.file}</div>}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='image'>Upload Image</Label>
          <Input
            type='file'
            id='image'
            name='image'
            className='border-solid border-2 w-80'
            required={trip == null}
            placeholder='Photo or picture'
          />
          {trip != null && (
            <Image
              src={trip.imagePath}
              height='400'
              width='400'
              alt='Trip Image'
            />
          )}
          {error.image && <div className='text-destructive'>{error.image}</div>}
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </Button>
  );
}
