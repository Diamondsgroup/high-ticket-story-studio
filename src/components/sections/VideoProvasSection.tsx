import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import v1 from '@/assets/prova-video-1.mp4.asset.json';
import v2 from '@/assets/prova-video-2.mp4.asset.json';
import p1 from '@/assets/prova-video-1.jpg.asset.json';
import p2 from '@/assets/prova-video-2.jpg.asset.json';

type Stat = { label: string; value: string; accent?: boolean };
type Item = { id: string; src: string; poster: string; tag: string; title: string; stats: Stat[] };

const items: Item[] = [
  {
    id: 'pv1',
    src: v1.url,
    poster: p1.url,
    tag: 'Resultado em 24h',
    title: 'Uma conta. Um único dia.',
    stats: [
      { label: 'Investido no dia', value: '€3.000+' },
      { label: 'Lucro no dia', value: '€5.000+', accent: true },
      { label: 'ROI', value: '2,4x' },
    ],
  },
  {
    id: 'pv2',
    src: v2.url,
    poster: p2.url,
    tag: 'Painel TikTok Ads',
    title: 'Uma única campanha. Escala real.',
    stats: [
      { label: 'Orçamento / dia', value: '€7.000' },
      { label: 'CPA médio', value: '~€10', accent: true },
      { label: 'Campanhas ativas', value: '1 só' },
    ],
  },
];

const PAUSE_ALL = 'provas-video-play';

const VideoCard: React.FC<{ item: Item }> = ({ item }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onOther = (e: Event) => {
      if ((e as CustomEvent).detail !== item.id) ref.current?.pause();
    };
    window.addEventListener(PAUSE_ALL, onOther);
    const v = ref.current;
    const io = new IntersectionObserver(
      ([en]) => { if (en && !en.isIntersecting) v?.pause(); },
      { threshold: 0.2 },
    );
    if (v) io.observe(v);
    return () => { window.removeEventListener(PAUSE_ALL, onOther); io.disconnect(); };
  }, [item.id]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      window.dispatchEvent(new CustomEvent(PAUSE_ALL, { detail: item.id }));
      v.play().catch(() => {});
    } else v.pause();
  };

  return (
    <article className="rounded-[28px] border border-white/10 bg-white/[0.03] p-3 sm:p-4 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(124,58,237,0.45)]">
      <div className="flex items-center justify-between px-1 pb-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-300">{item.tag}</span>
        <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Tela real
        </span>
      </div>
      <h3 className="px-1 pb-3 text-xl sm:text-2xl font-semibold tracking-tight text-white">{item.title}</h3>

      <div className="relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-[22px] bg-black">
        <video
          ref={ref}
          src={item.src}
          poster={item.poster}
          playsInline
          preload="metadata"
          muted={muted}
          onClick={toggle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={(e) => {
            const t = e.currentTarget;
            setProgress(t.duration ? t.currentTime / t.duration : 0);
          }}
          className="h-full w-full object-contain"
        />
        {!playing && (
          <button onClick={toggle} aria-label="Reproduzir" className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md ring-1 ring-white/30">
              <Play className="h-7 w-7 translate-x-0.5 fill-white text-white" />
            </span>
          </button>
        )}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent p-3">
          <button onClick={toggle} aria-label={playing ? 'Pausar' : 'Reproduzir'} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
            {playing ? <Pause className="h-4 w-4 fill-white text-white" /> : <Play className="h-4 w-4 fill-white text-white" />}
          </button>
          <div
            className="h-1 flex-1 cursor-pointer rounded-full bg-white/20"
            onClick={(e) => {
              const v = ref.current; if (!v || !v.duration) return;
              const r = e.currentTarget.getBoundingClientRect();
              v.currentTime = ((e.clientX - r.left) / r.width) * v.duration;
            }}
          >
            <div className="h-full rounded-full bg-white" style={{ width: `${progress * 100}%` }} />
          </div>
          <button onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Ativar som' : 'Silenciar'} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
            {muted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {item.stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-3 text-center">
            <div className={`text-lg sm:text-2xl font-semibold tracking-tight ${s.accent ? 'bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent' : 'text-white'}`}>
              {s.value}
            </div>
            <div className="mt-0.5 text-[10px] sm:text-xs uppercase tracking-wider text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>
    </article>
  );
};

export const VideoProvasSection: React.FC = () => (
  <section className="px-4 py-8 sm:py-12">
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">Bastidores reais</p>
        <h2 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-tight text-white">
          Números que falam <span className="bg-gradient-to-r from-purple-300 to-fuchsia-400 bg-clip-text text-transparent">sozinhos.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm sm:text-base text-slate-400">Dê o play e veja as contas rodando, ao vivo.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((it) => <VideoCard key={it.id} item={it} />)}
      </div>
    </div>
  </section>
);
