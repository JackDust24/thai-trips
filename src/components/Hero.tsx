import Logo from '@/app/ui/logo';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type HeroProps = {
  imagePath?: string;
  imageAlt?: string;
  children: React.ReactNode;
  className?: string;
  showImage?: boolean;
};

export function Hero({
  imagePath = '/travel-hero.png',
  imageAlt = 'Travel Hero',
  children,
  className,
  showImage = true,
}: HeroProps) {
  return (
    <div
      className={cn(
        'flex relative h-[16rem] shrink-0 items-end w-full bg-tripsBlue p-4 md:h-[34rem] shadow-xl',
        className
      )}
    >
      <Logo />
      {showImage && (
        <Image
          src={imagePath}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          className='absolute hidden md:block top-6 overflow-hidden p-1 opacity-70 rounded-xl shadow-inner'
          alt={imageAlt}
        />
      )}
      {children}
    </div>
  );
}
