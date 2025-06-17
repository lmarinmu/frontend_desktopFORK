"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  
  // No mostrar el header en las páginas de autenticación
  if (pathname === '/sign-in' || pathname === '/sign-up') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-emerald-600/90 backdrop-blur supports-[backdrop-filter]:bg-emerald-600/80">
      <div className="container flex h-24 items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="/assets/meetUN.svg"
            alt="MeetUN Logo"
            width={200}
            height={48}
            className="h-16 w-auto"
            priority
          />
          <div className="h-8 w-px bg-white/30" />
          <span className="font-bold text-3xl text-white">Super User</span>
        </div>
      </div>
    </header>
  );
}
