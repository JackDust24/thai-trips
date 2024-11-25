'use client';
import { format } from 'url';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, ReactNode } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export function Nav({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <nav className={cn('text-primary-foreground', className)}>{children}</nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'classname'>) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        'py-2 hover:text-tripsYellow text-white md:text-2xl focus-visible:bg-secondary focus-visible:text-secondary-foreground',
        pathname === props.href && 'text-tripsYellow'
      )}
    />
  );
}

export function LoginStatus() {
  const { data: session } = useSession();

  return (
    <div className='py-2 right-10 top-4 text-white z-50 flex items-center gap-4'>
      {session ? (
        <>
          {session.user.role === 'admin' && (
            <Link
              className='text-center text-white font-bold text-2xl hover:underline'
              href='/dashboard'
            >
              <strong>Dashboard</strong>
            </Link>
          )}
          <p className=''>{session.user?.email}</p>
          <Link
            className='text-center text-white hover:underline'
            href='/'
            onClick={() => signOut({ callbackUrl: '/', redirect: true })}
          >
            <strong>Sign Out</strong>
          </Link>
        </>
      ) : (
        <Link
          className='text-center text-white hover:underline'
          href='/'
          onClick={() => signIn()}
        >
          <strong>Sign In</strong>
        </Link>
      )}
    </div>
  );
}
