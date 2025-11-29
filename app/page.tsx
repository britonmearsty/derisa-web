import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
