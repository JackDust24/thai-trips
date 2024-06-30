import { Trip } from '@/types/types';
import data from '@/app/_mocks/mockItemData.json';
import { CheckoutForm } from '../../_components/CheckoutForm';
import { notFound } from 'next/navigation';
import Stripe from 'stripe';
import db from '@/database/database';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const getTrip = (id: string) => {
  return data.trips.find((trip) => trip.id === id);
};

export default async function PurchasePage({
  params: { id },
  searchParams: { coupon },
}: {
  params: { id: string };
  searchParams: { coupon?: string };
}) {
  const trip = await db.trip.findUnique({ where: { id } });

  //TODO: Remove after data added
  const mockTrip = getTrip(id);
  if (mockTrip == null) return notFound();

  return <CheckoutForm trip={mockTrip} />;
}
