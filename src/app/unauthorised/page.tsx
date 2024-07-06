import Link from 'next/link';

export default function Unauthorised() {
  return (
    <section className='flex items-center gap-8 justify-center flex-col min-h-screen'>
      <h1 className='flex text-3xl'>Unauthorised access</h1>
      <p className='text-3xl max-w-2xl text-center'>
        You do not have access here
      </p>
      <Link href='/' className='text-5xl text-red-600'>
        Return to Home Page
      </Link>
    </section>
  );
}
