import React from 'react';
import { siteContent } from '../../config/siteContent';
import { MapPin } from 'lucide-react';
import imgVistaCidade from '../../assets/lifestyle-vista-cidade.png.asset.json';
import imgNeve from '../../assets/lifestyle-neve.png.asset.json';
import imgMadri from '../../assets/lifestyle-madri.png.asset.json';
import img7Eleven from '../../assets/lifestyle-7eleven.png.asset.json';
import imgEstadio from '../../assets/lifestyle-estadio.png.asset.json';
import imgCachorro from '../../assets/lifestyle-cachorro.png.asset.json';
import imgBangkok from '../../assets/lifestyle-bangkok.png.asset.json';
import imgNeon from '../../assets/lifestyle-neon.png.asset.json';

const photos = [
  { src: imgVistaCidade.url, alt: 'Trabalhando com vista para a cidade', label: 'Escritório com vista' },
  { src: imgBangkok.url, alt: 'Explorando Bangkok', label: 'Bangkok, Tailândia' },
  { src: imgEstadio.url, alt: 'Jogo no Santiago Bernabéu', label: 'Madri, Espanha' },
  { src: imgNeve.url, alt: 'Dia de neve no exterior', label: 'Neve' },
  { src: imgNeon.url, alt: 'Rua de neon à noite na Ásia', label: 'Chinatown — Bangkok' },
  { src: imgMadri.url, alt: 'Noite em Madri', label: 'Centro de Madri' },
  { src: img7Eleven.url, alt: '7-Eleven à noite na Tailândia', label: 'Tailândia' },
  { src: imgCachorro.url, alt: 'Explorando a cidade', label: 'Explorando o mundo' },
];

export const LifestyleSection: React.FC = () => {
  const { lifestyle } = siteContent;

  if (!lifestyle) return null;

  return (
    <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#020205] text-white overflow-hidden border-t border-purple-950/40">
      {/* Luzes de ambientação sutis */}
      <div className="absolute top-1/4 left-1/4 w-[350px] sm:w-[500px] h-[250px] sm:h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[300px] sm:w-[450px] h-[200px] sm:h-[300px] bg-fuchsia-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Coluna de Textos */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pr-0 lg:pr-6 text-left">
            <div>
              {/* Tag Superior */}
              <div className="inline-block text-purple-400 font-mono font-semibold tracking-widest text-xs uppercase mb-4 sm:mb-6">
                {lifestyle.tag}
              </div>

              {/* Título Principal */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] sm:leading-[1.05] text-white mb-4 sm:mb-6 uppercase">
                <span>{lifestyle.headline.line1}</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-violet-300">
                  {lifestyle.headline.highlight}
                </span>
                <br />
                <span>{lifestyle.headline.line3}</span>
              </h2>

              {/* Descrição */}
              <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-md font-normal mb-6 sm:mb-8">
                {lifestyle.description}
              </p>
            </div>

            {/* Linha divisória e Citação */}
            <div className="pt-6 sm:pt-8 border-t border-purple-950/40 mt-auto">
              <blockquote className="text-slate-100 text-base sm:text-xl font-medium tracking-tight mb-2">
                {lifestyle.quote}
              </blockquote>
              <div className="text-purple-400 font-mono text-xs tracking-widest uppercase font-semibold">
                {lifestyle.verse}
              </div>
            </div>
          </div>

          {/* Mosaico de Fotos: altura natural, sem cortes */}
          <div className="lg:col-span-7 mt-4 lg:mt-0">
            <div className="columns-2 sm:columns-3 gap-2.5 sm:gap-3 [column-fill:balance]">
              {photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="group relative mb-2.5 sm:mb-3 break-inside-avoid rounded-xl sm:rounded-2xl overflow-hidden border border-purple-950/40 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] shadow-xl transition-all duration-300 bg-[#0a0414]/60"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Degradê + etiqueta de localização */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-purple-500/30 text-[10px] sm:text-[11px] font-semibold text-purple-200">
                    <MapPin className="w-3 h-3 text-fuchsia-400 shrink-0" />
                    <span className="truncate">{photo.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
