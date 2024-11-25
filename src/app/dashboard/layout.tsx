import { LoginStatus, Nav, NavLink } from '@/components/nav';

// will result in routes being rendered for each user at request time
export const dynamic = 'force-dynamic';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-stone-100'>
      {/* Outer container for Navbar and Main Content */}
      <div className='bg-tripsBlue'>
        {/* Navbar: Centered using container */}
        <Nav className='container flex items-center justify-between py-4'>
          <div className='flex space-x-4'>
            <NavLink href='/'>Main Site</NavLink>
            <NavLink href='/dashboard'>Home</NavLink>
            <NavLink href='/dashboard/trips'>Trips</NavLink>
            <NavLink href='/dashboard/customers'>Customers</NavLink>
            <NavLink href='/dashboard/orders'>Sales</NavLink>
            <NavLink href='/dashboard/locations'>Locations</NavLink>
          </div>
          <LoginStatus />
        </Nav>
      </div>
      <main className='container my-8'>{children}</main>
      <footer className='w-full px-6 lg:px-10 xl:px-16 py-4 bg-gray-800 text-white'>
        <div className='pl-8'>
          © {new Date().getFullYear()} HawkDev. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
