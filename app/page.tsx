import Footer from "@/components/custom/footer";
import HeroSection from "@/components/custom/hero-section";
import Navbar from "@/components/custom/navbar";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center bg-linear-to-r from-blue-500 via-blue-300 to-teal-300">
        <HeroSection />
      </div>
      <Footer />
    </div>
  );
}
