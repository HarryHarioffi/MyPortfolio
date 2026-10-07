import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Hero } from "@/components/home/Hero";
import { HowIWork } from "@/components/home/HowIWork";
import { WorkList } from "@/components/home/WorkList";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkList />
      <HowIWork />
      <AboutTeaser />
    </>
  );
}
