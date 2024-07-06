import { LoginStatus, Nav, NavLink } from '@/components/nav';

// will result in routes being rendered for each user at request time
export const dynamic = 'force-dynamic';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href='/dashboard'>Dashboard</NavLink>
        <NavLink href='/dashboard/trips'>Trips</NavLink>
        <NavLink href='/dashboard/customers'>Customers</NavLink>
        <NavLink href='/dashboard/orders'>Sales</NavLink>
        <NavLink href='/dashboard/locations'>Locations</NavLink>
        <LoginStatus />
      </Nav>
      <div className='container my-6'>{children}</div>
    </>
  );
}
