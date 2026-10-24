import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { VslSection } from './sections/VslSection';
import { LeadFormSection } from './sections/LeadFormSection';
import { ParaQuemSection } from './sections/ParaQuemSection';
import { PorQueEuropaSection } from './sections/PorQueEuropaSection';
import { ProvasSection } from './sections/ProvasSection';
import { VideoProvasSection } from './sections/VideoProvasSection';
import { MentorSection } from './sections/MentorSection';
import { LifestyleSection } from './sections/LifestyleSection';
import { FooterSection } from './sections/FooterSection';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020205] text-slate-100 flex flex-col selection:bg-purple-600 selection:text-white">
      <main className="flex-grow">
        <HeroSection />
        <VslSection />
        <LeadFormSection />
        <ParaQuemSection />
        <PorQueEuropaSection />
        <ProvasSection />
        <VideoProvasSection />
        <MentorSection />
        <LifestyleSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default App;
