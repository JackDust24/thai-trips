import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { roboto } from '@/app/ui/fonts';

export default function Logo() {
  return (
    <div
      className={`${roboto.className} z-50 flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Trips</p>
    </div>
  );
}