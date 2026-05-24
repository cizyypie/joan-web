import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillSplit from "@/components/SkillSplit";
import BuildLogs from "@/components/BuildLogs";
import ModeSwitch from "@/components/ModeSwitch";
import FutureDirection from "@/components/FutureDirection";
import UnlockMode from "@/components/UnlockMode";
import FinalCTA from "@/components/FinalCTA";
import TechMarquee from "@/components/TechMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SkillSplit />
      <TechMarquee />
      <BuildLogs />
      <ModeSwitch />
      <FutureDirection />
      <UnlockMode />
      <FinalCTA />
    </>
  );
}
