'use client';
import { format } from 'url';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, ReactNode } from 'react';
import { signOut, useSession } from 'next-auth/react';

export function Nav({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <nav
      className={cn(
        'bg-tripsBlue text-primary-foreground flex justify-center px-1 md:px-4',
        className
      )}
    >
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
        'p-4 hover:text-[#f3ff14] text-white md:text-2xl focus-visible:bg-secondary focus-visible:text-secondary-foreground',
        pathname === props.href && 'text-[#f3ff14]'
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
          <p className='hidden md:inline-block'>{session.user?.email}</p>
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
