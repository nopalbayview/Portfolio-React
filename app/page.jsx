import HeroSection from '../src/sections/home/Hero';
import TechStackSection from '../src/sections/home/Techstack';
import EducationSection from '../src/sections/home/Education';

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <HeroSection />
      <TechStackSection />
      <EducationSection />
    </div>
  );
}