'use client';
import { format } from 'url';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, ReactNode } from 'react';


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