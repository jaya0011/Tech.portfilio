import { Footer } from "@/components/netflix/footer";
import { Navbar } from "@/components/netflix/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
