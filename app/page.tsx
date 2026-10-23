import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Intro } from "@/components/home/Intro";
import { WorkList } from "@/components/home/WorkList";

/*
 * Hidden, not deleted, so either can come back:
 * - The previous hero (headline and facts row) lives on in components/home/Hero.tsx. Swap
 *   <Intro /> for <Hero /> to bring it back. Its design/code AgentCardDemo now sits in the Intro.
 * - "How I work" is components/home/HowIWork.tsx. Put <HowIWork /> back after <WorkList />.
 */
export default function Home() {
  return (
    <>
      <Intro />
      <WorkList />
      <AboutTeaser />
    </>
  );
}
