'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function MyOrdersPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/orders');
    },
  });

  return <div>Hello</div>;
}
