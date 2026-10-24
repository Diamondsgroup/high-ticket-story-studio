import React, { useEffect, useRef } from 'react';
import { CtaButton } from '../common/CtaButton';
import { siteContent } from '../../config/siteContent';

const VTURB_PLAYER_HTML =
  '<vturb-smartplayer id="vid-6adabaf24e1a50542a65fb5b" style="display:block;margin:0 auto;width:100%;">' +
  '<div class="vturb-player-placeholder" style="position:relative;width:100%;padding:56.25% 0 0;z-index:0;background-color:black;"></div>' +
  '</vturb-smartplayer>';

const VTURB_SCRIPT_SRC =
  'https://scripts.converteai.net/edb83c2d-fdbb-4547-8abd-203223d1fc8d/players/6adabaf24e1a50542a65fb5b/v4/player.js';

export const VslSection: React.FC = () => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playerRef.current && !playerRef.current.querySelector('vturb-smartplayer')) {
      playerRef.current.innerHTML = VTURB_PLAYER_HTML;
    }
    if (!document.querySelector('script[data-vturb-player]')) {
      const s = document.createElement('script');
      s.src = VTURB_SCRIPT_SRC;
      s.async = true;
      s.setAttribute('data-vturb-player', 'true');
      document.head.appendChild(s);
    }
  }, []);

  return (
    <section className="relative py-6 sm:py-10 px-4 sm:px-6 lg:px-8 bg-[#020205] overflow-hidden">
      {/* Luzes atmosféricas suaves */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Copy de chamada para a VSL */}
        <div className="text-center mb-5 sm:mb-6 px-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
            Assista até o fim: vou abrir{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-violet-300">
              minhas telas reais do TikTok Ads
            </span>{' '}
            e mostrar, na prática, onde está o ouro.
          </h2>
          <p className="text-slate-300 mt-3 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Nada de teoria. Você vai ver os painéis, os gastos e os números por trás da estratégia que quase ninguém no Brasil conhece — e que pode mudar o rumo da sua operação.
          </p>
        </div>

        {/* Player VTurb */}
        <div className="w-full rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_10px_50px_rgba(168,85,247,0.25)] bg-black">
          <div ref={playerRef} className="w-full" />
        </div>
        <div className="mt-5 flex w-full justify-center">
          <CtaButton text={siteContent.hero.cta.text} href={siteContent.hero.cta.href} />
        </div>
      </div>
    </section>
  );
};
