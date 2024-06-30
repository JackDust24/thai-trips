import { Nav, NavLink } from '@/components/nav';

export const dynamic = 'force-dynamic';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-stone-100'>
      <Nav>
        <NavLink href='/'>Home</NavLink>
        <NavLink href='/trips'>Trips</NavLink>
        <NavLink href='/orders'>My Orders</NavLink>
        <NavLink href='/locations'>Branches</NavLink>
      </Nav>
      <div className='container mt-2'>{children}</div>
    </div>
  );
}
