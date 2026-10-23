import React from 'react';
import { siteContent } from '../../config/siteContent';
import { Flame } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { hero } = siteContent;

  return (
    <section className="relative flex items-center overflow-hidden pt-6 pb-6 sm:pt-8 sm:pb-8 md:py-12 px-4 sm:px-6 lg:px-12 bg-[#020205]">

      {/* 
        BACKGROUND GRAPHIC RESPONSIVO:
        - Mobile: Usa hero-bg-mobile.webp com enquadramento focado no Guilherme + esfera neon e fade suave para o fundo escuro
        - Desktop: Usa hero-bg.webp panorâmico à direita
      */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Imagem Desktop */}
        <img
          src={hero.backgroundImage}
          alt="Tokfly Hero Background"
          className="hidden sm:block w-full h-full object-cover object-right opacity-95 transition-all duration-500"
        />

        {/* Imagem Mobile dedicada com enquadramento perfeito do rosto no topo */}
        <img
          src={hero.backgroundImageMobile || hero.backgroundImage}
          alt="Guilherme Panicali Tokfly"
          className="block sm:hidden w-full h-auto max-h-[580px] object-cover object-top opacity-95"
        />

        {/* Degradê Desktop (Horizontal): Mantém a esquerda limpa para a headline e a direita vibrante */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#020205] via-[#020205]/75 to-transparent w-full h-full" />

        {/* Degradê Mobile (Vertical adicional): Garante contraste total sobre qualquer tela */}
        <div className="block sm:hidden absolute inset-0 bg-gradient-to-b from-transparent via-[#020205]/80 to-[#020205] w-full h-full" />

        {/* Fades suaves de topo e rodapé */}
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-[#020205] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020205] to-transparent" />
      </div>

      {/* Luzes atmosféricas em degradê neon roxo */}
      <div className="absolute top-1/3 left-6 w-[350px] sm:w-[500px] h-[300px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[350px] sm:w-[400px] h-[300px] bg-fuchsia-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Container de Conteúdo: espaçamento calculado para que o topo exiba o rosto e o texto flua naturalmente logo abaixo */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start text-left pt-48 sm:pt-0">

        {/* Top Logo */}
        <div className="mb-4 sm:mb-8 transform transition hover:scale-105 duration-300">
          <img
            src={hero.logo}
            alt="Contramão"
            className="h-11 sm:h-14 md:h-16 w-auto object-contain drop-shadow-[0_4px_25px_rgba(168,85,247,0.35)]"
          />
        </div>

        {/* Exclusive Badge */}
        <div className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full border border-purple-500/40 bg-[#070210]/80 backdrop-blur-md mb-4 sm:mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-purple-400 animate-ping shrink-0" />
          <span className="text-[11px] sm:text-sm font-bold tracking-wider uppercase text-purple-300">
            Aceleração Estratégica em TikTok Ads • Mar Azul
          </span>
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fuchsia-400 ml-1 shrink-0" />
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.18] text-white max-w-xl lg:max-w-2xl xl:max-w-3xl mb-4 sm:mb-6 drop-shadow-lg">
          {hero.heading.prefix}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-violet-300 font-extrabold">
            {hero.heading.highlight}
          </span>
          {hero.heading.suffix}
        </h1>

      </div>
    </section>
  );
};

