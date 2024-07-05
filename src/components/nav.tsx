'use client';
import { format } from 'url';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, ReactNode } from 'react';
import { signOut, useSession } from 'next-auth/react';

export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className='bg-[#2962FF] text-primary-foreground flex justify-center px-4'>
      {children}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'classname'>) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        'p-4 hover:bg-[#0fffeb] text-white hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground',
        pathname === props.href && 'bg-[#0fefff] text-foreground'
      )}
    />
  );
}

export function LoginStatus() {
  const { data: session } = useSession();
  return (
    <div className='absolute right-10 top-4 text-white'>
      {session ? (
        <>
          {session.user?.email}
          <Link
            className='text-center text-white hover:underline'
            href='/'
            onClick={() => signOut()}
          >
            {' '}
            <strong>Sign Out</strong>
          </Link>
        </>
      ) : (
        <strong>Sign In</strong>
      )}
    </div>
  );
}
