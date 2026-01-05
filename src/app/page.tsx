import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import ProblemSolution from "@/components/ProblemSolution";
import Features from "@/components/Features";
import Platform from "@/components/Platform";
import DataVisuals from "@/components/DataVisuals";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-cyan-100 selection:text-cyan-900">
      <Hero />
      <Introduction />
      <ProblemSolution />
      <Features />
      <Platform />
      <DataVisuals />
      <Footer />
    </main>
  );
}

