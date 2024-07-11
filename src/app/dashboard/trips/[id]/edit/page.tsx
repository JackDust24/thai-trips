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
      <TripForm trip={trip} />
    </>
  );
}
