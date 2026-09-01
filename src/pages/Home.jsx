import React from 'react';
import HeroSection from '../sections/home/Hero';
import TechStackSection from '../sections/home/Techstack';
import EducationSection from '../sections/home/Education';

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <HeroSection/>
      <TechStackSection/>
      <EducationSection/>
    </div>
  );
}