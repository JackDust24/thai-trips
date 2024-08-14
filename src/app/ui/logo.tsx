import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { roboto } from '@/app/ui/fonts';

export default function Logo() {
  return (
    <div
      className={`${roboto.className} z-50 flex flex-row absolute items-center leading-none text-white`}
    >
      <GlobeAltIcon className='h-6 w-6 md:h-12 md:w-12 rotate-[15deg]' />
      <p className='text-[1.5rem] md:text-[3rem]'>Trips</p>
    </div>
  );
}
