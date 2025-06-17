import React from "react";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="fixed hidden h-full w-1/2 justify-center bg-[#141e3a] p-10 lg:flex xl:w-2/5">
        <div className="max-w-[430px] flex-col">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/assets/meetUN-white.svg"
                alt="logo"
                width={280}
                height={100}
                className="h-auto"
              />
            </Link>
          </div>
          <div className="mt-6 flex flex-grow flex-col items-center justify-center space-y-12">
            <div className="space-y-5 text-white">
              <h1 className="h1">Conecta con grupos universitarios</h1>
              <p className="body-1">
                Descubre, únete y participa en comunidades estudiantiles de tu
                universidad.
              </p>
            </div>
            <Image
              src="/assets/auth-img.svg"
              alt="Files"
              width={350}
              height={350}
              className="transition-all hover:scale-105 hover:rotate-2"
            />
          </div>
        </div>
      </section>

      <section className="my-10 flex flex-1 flex-col items-center bg-white p-4 py-10 lg:ml-[50%] lg:justify-center lg:p-10 lg:py-0 xl:ml-[40%]">
        <div className="mb-16 lg:hidden">
          <Image
            src="/assets/meetUN.svg"
            alt="logo"
            width={250}
            height={200}
            className="h-auto w-[250px] lg:w-[300px]"
          />
        </div>

        {children}
      </section>
    </div>
  );
};

export default Layout;
