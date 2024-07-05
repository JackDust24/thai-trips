import { Nav, NavLink, LoginStatus } from '@/components/nav';

export const dynamic = 'force-dynamic';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col bg-stone-100'>
      {/* <div className='flex flex-row justify-between'> */}
      <Nav>
        <NavLink href='/'>Home</NavLink>
        <NavLink href='/trips'>Trips</NavLink>
        <NavLink href='/orders'>My Orders</NavLink>
        <NavLink href='/locations'>Branches</NavLink>
        <LoginStatus />
      </Nav>

      {/* </div> */}
      <div className='container mt-2'>{children}</div>
    </div>
  );
}
