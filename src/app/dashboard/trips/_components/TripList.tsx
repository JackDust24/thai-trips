import db from '@/database/database';
import Link from 'next/link';
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency, formatNumber } from '@/lib/formatter';
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from '../_actions/tripActions';

export async function TablesList() {
  const trips = await db.trip.findMany({
    select: {
      id: true,
      name: true,
      priceInBaht: true,
      numberOfPlaces: true,
      isAvailableForPurchase: true,
      location: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: 'asc' },
  });

  if (trips.length === 0) return <p>No Trips added</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-0'>
            <span className='sr-only'>Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Persons</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className='w-0'>
            <span className='sr-only'>Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => (
          <TableRow key={trip.id}>
            {' '}
            <TableCell>
              {trip.isAvailableForPurchase ? (
                <>
                  <span className='sr-only'>Available</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className='sr-only'>Unavailable</span>
                  <XCircle className='stroke-destructive' />
                </>
              )}
            </TableCell>
            <TableCell>{trip.name}</TableCell>
            <TableCell>{trip.location}</TableCell>
            <TableCell>{formatCurrency(trip.priceInBaht)}</TableCell>
            <TableCell>{trip.numberOfPlaces}</TableCell>
            <TableCell>{formatNumber(trip._count.orders)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className='sr-only'>Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/trips/${trip.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a download href={`/dashboard/trips/${trip.id}/download`}>
                      Download
                    </a>
                  </DropdownMenuItem>
                  <ActiveToggleDropdownItem
                    id={trip.id}
                    isAvailableForPurchase={trip.isAvailableForPurchase}
                  />
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem
                    id={trip.id}
                    disabled={trip._count.orders > 0}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
