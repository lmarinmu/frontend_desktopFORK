import { HydrateClient } from "~/trpc/server";
import Hero from "../_components/landingPage/Hero";

export default async function Home() {
  return (
    /* El HydrateClient es un componente de tRPC, que ayuda al SSR */
    <HydrateClient>
      <main>
        <Hero />
      </main>
    </HydrateClient>
  );
}
