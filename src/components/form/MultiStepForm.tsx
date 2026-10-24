import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, CheckCircle2, ChevronDown, Loader2, ShieldCheck, X } from 'lucide-react';
import { FORM_ENDPOINT, formQuestions } from '../../config/formQuestions';
import { trackLead } from '../../lib/metaPixel';

const LETTERS = 'ABCDEFGHIJ';

function validate(id: string, v: string, required: boolean): string | null {
  const s = v.trim();
  if (!s) return required ? 'Por favor, preencha este campo' : null;
  if (id === 'whatsapp' && !/^[\d\s()+-]{10,20}$/.test(s)) return 'WhatsApp com DDD inválido';
  if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return 'E-mail inválido';
  if (id === 'nome' && s.length < 2) return 'Informe seu nome';
  return null;
}

interface Props {
  onClose?: () => void;
  variant?: 'modal' | 'inline';
}

export const MultiStepForm: React.FC<Props> = ({ onClose, variant = 'modal' }) => {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const isModal = variant === 'modal';

  useEffect(() => {
    if (!isModal) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isModal, onClose]);

  const q = formQuestions[step]!;
  const total = formQuestions.length;
  const value = values[q.id] ?? '';
  const firstName = (values['nome'] ?? '').trim().split(' ')[0];

  const submit = async (all: Record<string, string>) => {
    setStatus('sending');
    const eventId = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    try {
      const payload: Record<string, string> = {};
      formQuestions.forEach((x) => (payload[x.id] = (all[x.id] ?? '').trim().slice(0, 255)));
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...payload, data: new Date().toISOString(), origem: window.location.href }),
      });
      trackLead(eventId);
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  };

  const next = (override?: string) => {
    const v = override ?? value;
    const err = validate(q.id, v, q.required);
    if (err) return setError(err);
    setError(null);
    const all = { ...values, [q.id]: v };
    setValues(all);
    if (step < total - 1) {
      setDir(1);
      setStep(step + 1);
    } else submit(all);
  };

  const back = () => {
    if (step === 0) return;
    setError(null);
    setDir(-1);
    setStep(step - 1);
  };

  const label = q.id !== 'nome' && firstName && step === 1 ? `${firstName}, ${q.label.charAt(0).toLowerCase()}${q.label.slice(1)}` : q.label;

  const card = (
    <div
      onClick={(e) => e.stopPropagation()}
      role={isModal ? 'dialog' : undefined}
      aria-modal={isModal ? true : undefined}
      className={`relative w-full overflow-hidden bg-[#05050a] border border-purple-500/40 shadow-[0_0_70px_rgba(168,85,247,0.3)] ${
        isModal ? 'sm:max-w-xl rounded-t-3xl sm:rounded-3xl min-h-[78vh] sm:min-h-[520px]' : 'max-w-xl mx-auto rounded-3xl min-h-[460px]'
      } flex flex-col`}
    >
      {/* Globo roxo opaco ao fundo */}
      <img
        src="/images/globe-neon.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] max-w-none sm:w-[120%] opacity-[0.12] select-none"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.18),transparent_65%)]" />

      {/* Barra de progresso no topo, estilo Typeform */}
      <div className="relative h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-[#9333ea] to-[#c084fc] shadow-[0_0_12px_rgba(168,85,247,0.9)] transition-all duration-500"
          style={{ width: `${status === 'ok' ? 100 : (step / total) * 100}%` }}
        />
      </div>

      {isModal && (
        <button onClick={onClose} aria-label="Fechar" className="absolute top-4 right-4 z-20 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 py-10">
        {status === 'ok' ? (
          <div className="text-center animate-[tfIn_.5s_ease]">
            <CheckCircle2 className="w-16 h-16 text-purple-400 mx-auto mb-5 drop-shadow-[0_0_24px_rgba(168,85,247,0.8)]" />
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
              {firstName ? `Obrigado, ${firstName}!` : 'Aplicação recebida!'}
            </h3>
            <p className="text-slate-300 text-base">Vamos analisar seu perfil e entrar em contato pelo WhatsApp.</p>
            {isModal && (
              <button onClick={onClose} className="mt-7 rounded-xl px-6 py-3 font-bold text-white border border-purple-400/40 bg-white/5">
                Fechar
              </button>
            )}
          </div>
        ) : (
          <form
            key={step}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
            className={dir > 0 ? 'animate-[tfIn_.45s_ease]' : 'animate-[tfBack_.45s_ease]'}
          >
            <div className="flex items-start gap-3 mb-6">
              <span className="mt-1.5 shrink-0 inline-flex items-center gap-1 text-purple-400 text-sm font-bold">
                {step + 1} <span className="text-purple-500">→</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {label}
                {q.required && <span className="text-purple-400">*</span>}
              </h3>
            </div>

            <div className="pl-0 sm:pl-8">
              {q.type === 'choice' ? (
                <div className="space-y-2.5">
                  {q.options.map((o, i) => {
                    const active = value === o;
                    return (
                      <button
                        key={o}
                        type="button"
                        disabled={status === 'sending'}
                        onClick={() => {
                          setValues((v) => ({ ...v, [q.id]: o }));
                          setTimeout(() => next(o), 280);
                        }}
                        className={`w-full flex items-center gap-3 text-left rounded-lg px-3 py-3 border transition-all duration-200 ${
                          active
                            ? 'border-purple-400 bg-purple-500/25 text-white shadow-[0_0_18px_rgba(168,85,247,0.4)]'
                            : 'border-purple-500/30 bg-purple-500/[0.07] text-slate-100 hover:bg-purple-500/15'
                        }`}
                      >
                        <span
                          className={`shrink-0 w-7 h-7 rounded-md border text-xs font-bold flex items-center justify-center ${
                            active ? 'bg-purple-500 border-purple-400 text-white' : 'border-purple-400/50 text-purple-300'
                          }`}
                        >
                          {LETTERS[i]}
                        </span>
                        <span className="flex-1 text-base">{o}</span>
                        {active && <Check className="w-5 h-5 text-purple-300" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <input
                  autoFocus={isModal || step > 0}
                  type={q.type}
                  placeholder={q.placeholder}
                  autoComplete={q.autoComplete ?? 'off'}
                  maxLength={255}
                  value={value}
                  onChange={(e) => {
                    setError(null);
                    setValues((v) => ({ ...v, [q.id]: e.target.value }));
                  }}
                  className="w-full bg-transparent border-0 border-b-2 border-purple-500/40 focus:border-purple-400 px-0 py-3 text-xl sm:text-2xl text-white placeholder:text-purple-200/30 focus:outline-none transition"
                />
              )}

              {error && <p className="mt-3 inline-block text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded px-2.5 py-1">{error}</p>}
              {status === 'error' && <p className="mt-3 text-sm text-red-400">Não foi possível enviar. Tente novamente.</p>}

              {(q.type !== 'choice' || status !== 'idle') && (
                <div className="flex items-center gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-bold text-white bg-gradient-to-r from-[#9333ea] to-[#a855f7] shadow-lg shadow-purple-900/50 hover:brightness-110 disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {step === total - 1 ? 'Enviar' : 'OK'} <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <span className="hidden sm:inline text-xs text-slate-400">
                    pressione <b className="text-slate-200">Enter ↵</b>
                  </span>
                </div>
              )}
            </div>
          </form>
        )}
      </div>

      {status !== 'ok' && (
        <div className="relative z-10 flex items-center justify-between px-6 sm:px-10 pb-5">
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-purple-400" /> Aplicação sujeita à aprovação
          </p>
          <div className="flex rounded-lg overflow-hidden border border-purple-500/40">
            <button type="button" onClick={back} disabled={step === 0} aria-label="Anterior" className="p-2 bg-purple-600/80 text-white disabled:opacity-40">
              <ArrowLeft className="w-4 h-4 rotate-90" />
            </button>
            <button type="button" onClick={() => next()} aria-label="Próxima" className="p-2 bg-purple-600/80 text-white border-l border-purple-400/40">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (!isModal) return card;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md sm:p-4" onClick={onClose}>
      {card}
    </div>
  );
};

export default MultiStepForm;
