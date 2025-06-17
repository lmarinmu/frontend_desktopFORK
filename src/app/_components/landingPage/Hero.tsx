import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="mx-auto flex h-[85vh] max-w-[1440px] flex-col items-center justify-center gap-8 px-6 py-10 md:flex-row md:gap-10 lg:gap-16">
      {/* Lado izquierdo: Texto y CTA */}
      <div className="flex max-w-xl flex-1 flex-col justify-center text-left">
        <h1 className="h2 leading-tight font-bold text-[#4D4D4D] lg:text-[38px]">
          La plataforma de los estudiantes: donde los intereses se convierten en
          comunidad
        </h1>
        <p className="mt-4 text-base text-[#717171] lg:text-lg">
          Explora, únete y participa en actividades reales que conectan a
          estudiantes como tú. Eventos y encuentros suceden todos los días en tu
          universidad. ¡Regístrate y forma parte de la experiencia!
        </p>
        <div className="mt-6 flex flex-col gap-4 text-center sm:flex-row">
          <Link
            href="/sign-up"
            className="rounded-md bg-[#4CAF4F] px-8 py-3 text-white transition hover:bg-[#4CAF4F]/80"
          >
            Empezar Ahora
          </Link>
        </div>
      </div>

      {/* Lado derecho: Imagen */}
      <div className="flex max-w-xl flex-1 items-center justify-center transition-transform hover:scale-105">
        <div className="relative h-64 w-full min-w-[300px] sm:h-80 md:h-96 lg:h-[500px]">
          <Image
            src="/assets/hero-img.svg"
            alt="phone"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
