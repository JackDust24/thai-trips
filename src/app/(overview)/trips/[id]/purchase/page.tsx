import { CheckoutForm } from '../../_components/CheckoutForm';
import { notFound } from 'next/navigation';
import db from '@/database/database';

export default async function PurchasePage({
  params: { id },
  searchParams: { coupon },
}: {
  params: { id: string };
  searchParams: { coupon?: string };
}) {
  const trip = await db.trip.findUnique({ where: { id } });

  if (trip == null) return notFound();

  return <CheckoutForm trip={trip} />;
}
