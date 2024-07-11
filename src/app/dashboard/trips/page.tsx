import { Button } from '@/components/ui/button';
import { PageHeader } from '../_components/PageHeader';
import Link from 'next/link';
import { TablesList } from './_components/TripList';

export default function DashboardTripsPage() {
  return (
    <>
      <div className='flex justify-between items-center gap-4'>
        <PageHeader>List of Trips</PageHeader>
        <p>
          Please make sure you make trip{' '}
          <strong>available for purchase!</strong>
        </p>
        <Button asChild>
          <Link href='/dashboard/trips/add'>Add Trip</Link>
        </Button>
      </div>
      <TablesList />
    </>
  );
}
