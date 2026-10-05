import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { WorkList } from "@/components/home/WorkList";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkList />
      <About />
      <Contact />
    </>
  );
}
