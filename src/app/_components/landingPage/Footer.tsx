import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "~/constants";
// import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
// import { FaXTwitter, FaThreads } from "react-icons/fa6";

type ColumnProps = {
  title: string;
  links: Array<{ name: string; href: string }>;
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="flex min-w-[120px] flex-col space-y-1">
    <h3 className="pb-2 text-lg font-semibold">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.name}>
          <Link href={link.href} className="text-stone-300 hover:underline">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-900 py-10 text-gray-200">
    <div className="container mx-auto px-6 py-8 lg:px-20">
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <div className="flex flex-col items-center gap-5 md:w-1/2 md:items-start lg:w-1/3 lg:justify-between">
          <Image
            src="/assets/meetUN-white.svg"
            width={200}
            height={200}
            alt="MeetUN Logo"
          />
          <div className="mb-5 flex flex-col space-y-1 text-center md:text-left">
            <p className="text-sm text-gray-400">Copyright © 2025 MeetUN.</p>
            <p className="text-sm text-gray-400">
              Todos los derechos reservados.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 sm:px-16 md:justify-end md:px-0 lg:flex-row">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:text-center md:text-start">
            {footerLinks.map((column, index) => (
              <FooterColumn
                key={index}
                title={column.title}
                links={column.links}
              />
            ))}
          </div>
          <div className="mt-5 sm:px-12 md:px-0 lg:mt-0 lg:ml-5 lg:w-2/5">
            <h3 className="mb-2 pb-2 text-lg font-semibold">Mantente al día</h3>
            <div className="relative max-w-md">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-300 focus:ring-2 focus:ring-gray-300 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-r-md bg-white px-3 py-2 transition hover:bg-gray-300"
              >
                <Image
                  src="/assets/send-icon.svg"
                  width={24}
                  height={24}
                  alt="Arrow Right"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
