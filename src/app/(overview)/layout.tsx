import { Nav, NavLink, LoginStatus } from '@/components/nav';

export const dynamic = 'force-dynamic';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col bg-stone-100'>
      <Nav>
        <NavLink href='/'>Home</NavLink>
        <NavLink href='/trips'>Trips</NavLink>
        <NavLink href='/orders'>My Orders</NavLink>
        <NavLink href='/locations'>Locations</NavLink>
        <LoginStatus />
      </Nav>
      <div className='container mt-2'>{children}</div>
    </div>
  );
}
