import React from 'react';
import { MultiStepForm } from '../form/MultiStepForm';

export const LeadFormSection: React.FC = () => (
  <section id="aplicar" className="relative scroll-mt-4 py-8 sm:py-12 px-4 sm:px-6 bg-[#020205]">
    <div className="text-center mb-5">
      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Aplique para a implementação</h3>
      <p className="text-slate-400 text-sm mt-2">Leva menos de 1 minuto.</p>
    </div>
    <MultiStepForm variant="inline" />
  </section>
);
