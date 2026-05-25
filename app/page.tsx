import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillSplit from "@/components/SkillSplit";
import BuildLogs from "@/components/BuildLogs";
import UnlockMode from "@/components/UnlockMode";
import FinalCTA from "@/components/FinalCTA";

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
