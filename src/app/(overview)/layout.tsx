import { Nav, NavLink, LoginStatus } from '@/components/nav';

export const dynamic = 'force-dynamic';

export default function Layout({
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
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/trips'>Trips</NavLink>
            <NavLink href='/orders'>My Orders</NavLink>
            <NavLink href='/locations'>Locations</NavLink>
          </div>
          <LoginStatus />
        </Nav>
      </div>

      {/* Breadcrumbs: Full width with alignment padding */}
      <div className='bg-[#FFC528] w-full px-6 lg:px-10 xl:px-16'>
        <div className='pl-8 py-3 text-tripsYellow-foreground'>
          <p>Brearcrumbs to appear here ...</p>
        </div>
      </div>

      {/* Main Content: Centered within container */}
      <main className='container my-8'>{children}</main>

      {/* Footer: Full width with alignment padding */}
      <footer className='w-full px-6 lg:px-10 xl:px-16 py-4 bg-gray-800 text-white'>
        <div className='pl-8'>
          © {new Date().getFullYear()} HawkDev. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
