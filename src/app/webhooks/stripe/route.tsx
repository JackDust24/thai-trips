import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import data from '@/app/_mocks/mockItemData.json';
import db from '@/database/database';

//TODO: Redo file

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature') as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === 'charge.succeeded') {
    const charge = event.data.object;
    const tripId = charge.metadata.tripId;
    const email = charge.billing_details.email;
    const pricePaidInBaht = charge.amount;
    const locationId = '1';

    const trip = await db.trip.findUnique({ where: { id: tripId } });

    if (trip == null || email == null) {
      return new NextResponse('Bad Request', { status: 400 });
    }
  }

  return new NextResponse();
}
