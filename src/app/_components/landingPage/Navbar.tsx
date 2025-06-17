"use client";

import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar bg-[#f4f1e6] shadow-md">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image src="/assets/meetUN.svg" width={150} height={60} alt="logo" />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/sign-in"
          className="border-dark-200 rounded-md border px-4 py-2 transition hover:bg-white"
        >
          Ingresar
        </Link>
        <Link
          href="/sign-up"
          className="rounded-md bg-[#4CAF4F] px-4 py-2 text-white transition hover:bg-[#4CAF4F]/80"
        >
          Registrarse
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
