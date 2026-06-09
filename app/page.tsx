import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { WorkReel } from "@/components/portfolio/WorkReel";
import { About, Process, Extras, Contact } from "@/components/portfolio/Sections";

export default function Home() {
  return (
    <main className="bg-bone text-ink min-h-screen">
      <Nav />
      <Hero />
      <WorkReel />
      <About />
      <Process />
      <Extras />
      <Contact />
    </main>
  );
}

