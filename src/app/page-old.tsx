import Image from "next/image";
import Logo from "@/app/ui/logo";
import { lusitana } from '@/app/ui/fonts';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="flex relative h-20 shrink-0 items-end rounded-lg bg-[#2962FF] p-4 md:h-80 shadow-xl">
        <Logo />
        <Image
            src="/travel-hero.png"
            layout="fill"
            objectFit='cover'
            objectPosition='center'
            className="absolute hidden md:block top-6 overflow-hidden p-1 opacity-70 rounded-xl shadow-inner"
            alt="Screenshots of the dashboard project showing desktop version"
          />
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <p className={`${lusitana.className} text-xl text-gray-800 antialiased md:text-3xl md:leading-normal`}
          >
       Hello World
       </p>
      </div>
    </main>
  );
}
