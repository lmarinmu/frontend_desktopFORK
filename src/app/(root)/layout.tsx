import Footer from "~/app/_components/landingPage/Footer";
import Navbar from "~/app/_components/landingPage/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="bg-[#fffbef]">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
