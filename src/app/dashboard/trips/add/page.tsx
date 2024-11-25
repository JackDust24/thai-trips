import { PageHeader } from '../../_components/PageHeader';
import { TripForm } from '../_components/TripForm';

export default function AddTripPage() {
  return (
    <>
      <PageHeader>Add Trip</PageHeader>
      <h1 className='text-sm text-gray-500 mb-4'>
        Demo purposses only - you will not be able to upload an image
      </h1>
      <TripForm />
    </>
  );
}
