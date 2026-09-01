import React from 'react';
import AboutSection from '../sections/about/About';
import WorkflowSection from '../sections/about/Workflow';

export default function About() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center pt-10">
      <AboutSection />
      <WorkflowSection/>
    </div>
  );
}