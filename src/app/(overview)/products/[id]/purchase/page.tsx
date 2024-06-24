import { Product } from '@/types/types';
import data from '@/app/_mocks/mockItemData.json';
import { CheckoutForm } from '../../_components/CheckoutForm';
import { notFound } from 'next/navigation';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const getProduct = (id: string) => {
  return data.products.find((product) => product.id === id);
};

export default async function PurchasePage({
  params: { id },
  searchParams: { coupon },
}: {
  params: { id: string };
  searchParams: { coupon?: string };
}) {
  const product = getProduct(id);
  if (product == null) return notFound();

  return <CheckoutForm product={product} />;
}
