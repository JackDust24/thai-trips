import { Button } from '@/components/ui/button';
import { PageHeader } from '../_components/PageHeader';
import Link from 'next/link';

export default function DashboardTripsPage() {
  return (
    <div className='flex justify-between items-center gap-4'>
      <PageHeader>Products</PageHeader>
      <p>
        Page Under Contruction. Can <strong>Add Trip</strong> still
      </p>
      <Button asChild>
        <Link href='/dashboard/trips/add'>Add Trip</Link>
      </Button>
    </div>
  );
}
