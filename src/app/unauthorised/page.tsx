import Link from 'next/link';

export default function Unauthorised() {
  return (
    <section className='flex items-center'>
      <h1 className='text-3xl'>Unauthorised access</h1>
      <p className='text-3xl max-w-2xl text-center'>
        You do not have access here
      </p>
      <Link href='/' className='text-3xl'>
        Return to Home Page
      </Link>
    </section>
  );
}
