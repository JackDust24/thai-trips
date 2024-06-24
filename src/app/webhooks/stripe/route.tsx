import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import data from '@/app/_mocks/mockItemData.json';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature') as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === 'charge.succeeded') {
    const charge = event.data.object;
    const productId = charge.metadata.productId;
    const email = charge.billing_details.email;
    const pricePaidInBaht = charge.amount;
    const locationId = '1';

    const product = data.products.find((product) => product.id === productId);

    // const product = await db.product.findUnique({ where: { id: productId } });
    if (product == null || email == null) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const userFields = {
      email,
      orders: {
        create: { productId, pricePaidInBaht, discountCodeId, locationId },
      },
    };
    // const {
    //   orders: [order],
    // } = await db.user.upsert({
    //   where: { email },
    //   create: userFields,
    //   update: userFields,
    //   select: { orders: { orderBy: { createdAt: 'desc' }, take: 1 } },
    // });
  }

  return new NextResponse();
}
