'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

//TODO: Set up page
export default function MyOrdersPage() {
  //TODO: WHen properly set up implement this:
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/api/auth/signin?callbackUrl=orders');
  //     // redirect('/');
  //   },
  // });

  return <div>Page Under Construction</div>;
}
