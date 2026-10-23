import React, { useEffect, useRef } from 'react';
import { siteContent } from '../../config/siteContent';
import { CtaButton } from '../common/CtaButton';
import { ShieldCheck } from 'lucide-react';

const VTURB_PLAYER_HTML =
  '<vturb-smartplayer id="vid-6adabaf24e1a50542a65fb5b" style="display:block;margin:0 auto;width:100%;">' +
  '<div class="vturb-player-placeholder" style="position:relative;width:100%;padding:56.25% 0 0;z-index:0;background-color:black;"></div>' +
  '</vturb-smartplayer>';

const VTURB_SCRIPT_SRC =
  'https://scripts.converteai.net/edb83c2d-fdbb-4547-8abd-203223d1fc8d/players/6adabaf24e1a50542a65fb5b/v4/player.js';

export const VslSection: React.FC = () => {
  const { hero } = siteContent;
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
    <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#020205] overflow-hidden">
      {/* Luzes atmosféricas suaves */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Player VTurb */}
        <div className="w-full rounded-2xl overflow-hidden border border-purple-500/30 shadow-[0_10px_50px_rgba(168,85,247,0.25)] bg-black">
          <div ref={playerRef} className="w-full" />
        </div>

        {/* CTA abaixo da VSL */}
        <div className="flex flex-col items-center gap-2.5 w-full sm:w-auto mt-8 sm:mt-10">
          <CtaButton
            text={hero.cta.text}
            href={hero.cta.href}
            size="lg"
            className="w-full sm:w-auto justify-center"
          />
          <span className="text-xs text-slate-300 tracking-wide flex items-center gap-1.5 mt-1 font-medium">
            <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" /> Aplicação sujeita à aprovação!
          </span>
        </div>
      </div>
    </section>
  );
};
