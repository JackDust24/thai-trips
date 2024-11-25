import db from '@/database/database';
import { PageHeader } from '../../../_components/PageHeader';
import { TripForm } from '../../_components/TripForm';

export default async function EditTripPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const trip = await db.trip.findUnique({ where: { id } });

  return (
    <>
      <PageHeader>Edit Trip</PageHeader>
      <h1 className='text-sm text-gray-500 mb-4'>
        Demo purposses only - you will not be able to upload an image
      </h1>
      <TripForm trip={trip} />
    </>
  );
}
