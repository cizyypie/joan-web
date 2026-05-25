import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SkillSplit from "@/components/sections/SkillSplit";
import BuildLogs from "@/components/sections/BuildLogs";
import UnlockMode from "@/components/sections/UnlockMode";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SkillSplit />
      <BuildLogs />
      <UnlockMode />
      <FinalCTA />
    </>
  );
}
