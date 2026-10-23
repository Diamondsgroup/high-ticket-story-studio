import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { ParaQuemSection } from './sections/ParaQuemSection';
import { PorQueEuropaSection } from './sections/PorQueEuropaSection';
import { ProvasSection } from './sections/ProvasSection';
import { MentorSection } from './sections/MentorSection';
import { LifestyleSection } from './sections/LifestyleSection';
import { FooterSection } from './sections/FooterSection';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020205] text-slate-100 flex flex-col selection:bg-purple-600 selection:text-white">
      <main className="flex-grow">
        <HeroSection />
        <ParaQuemSection />
        <PorQueEuropaSection />
        <ProvasSection />
        <MentorSection />
        <LifestyleSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default App;
