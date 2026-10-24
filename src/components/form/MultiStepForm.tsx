import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, ShieldCheck, X } from 'lucide-react';
import { FORM_ENDPOINT, formQuestions } from '../../config/formQuestions';
import { trackLead } from '../../lib/metaPixel';

const field =
  'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3.5 text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition';

function validate(id: string, v: string, required: boolean): string | null {
  const s = v.trim();
  if (!s) return required ? 'Campo obrigatório' : null;
  if (id === 'whatsapp' && !/^[\d\s()+-]{10,20}$/.test(s)) return 'WhatsApp com DDD inválido';
  if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return 'E-mail inválido';
  if (id === 'nome' && s.length < 2) return 'Informe seu nome';
  return null;
}

export const MultiStepForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const q = formQuestions[step];
  const total = formQuestions.length;
  const value = values[q.id] ?? '';

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
    if (step < total - 1) setStep(step + 1);
    else submit(all);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border border-purple-500/40 bg-[#07070d] p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.35)]"
      >
        <button onClick={onClose} aria-label="Fechar" className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        {status === 'ok' ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-purple-400 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]" />
            <h3 className="text-2xl font-black text-white mb-2">Aplicação recebida!</h3>
            <p className="text-slate-300">Vamos analisar seu perfil e entrar em contato pelo WhatsApp.</p>
            <button onClick={onClose} className="mt-6 rounded-2xl px-6 py-3 font-bold text-white border border-purple-400/40 bg-white/5">
              Fechar
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 pr-8">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Etapa {step + 1} de {total}</span>
                <span>{Math.round(((step + 1) / total) * 100)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#7c3aed] shadow-[0_0_12px_rgba(168,85,247,0.8)] transition-all duration-300"
                  style={{ width: `${((step + 1) / total) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-4">{q.label}</h3>

            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                next();
              }}
              className="space-y-3"
            >
              {q.type === 'choice' ? (
                <div className="space-y-2">
                  {q.options.map((o) => (
                    <button
                      key={o}
                      type="button"
                      disabled={status === 'sending'}
                      onClick={() => {
                        setValues((v) => ({ ...v, [q.id]: o }));
                        next(o);
                      }}
                      className={`w-full text-left rounded-xl px-4 py-3.5 border transition ${
                        value === o ? 'border-purple-400 bg-purple-500/15 text-white' : 'border-white/10 bg-white/5 text-slate-200 hover:border-purple-400/60'
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  key={q.id}
                  autoFocus
                  type={q.type}
                  placeholder={q.placeholder}
                  autoComplete={q.autoComplete ?? 'off'}
                  maxLength={255}
                  value={value}
                  onChange={(e) => setValues((v) => ({ ...v, [q.id]: e.target.value }))}
                  className={field}
                />
              )}
              {error && <p className="text-xs text-red-400">{error}</p>}
              {status === 'error' && <p className="text-sm text-red-400">Não foi possível enviar. Tente novamente.</p>}

              <div className="flex gap-2 pt-2">
                {step > 0 && (
                  <button type="button" onClick={() => { setError(null); setStep(step - 1); }} className="rounded-2xl px-4 py-4 border border-white/10 text-slate-300">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                {(q.type !== 'choice' || status === 'sending' || status === 'error') && (
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#7c3aed] shadow-xl shadow-purple-900/40 border border-purple-400/40 disabled:opacity-60"
                  >
                    {status === 'sending' ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{step === total - 1 ? 'Enviar aplicação' : 'Continuar'} <ArrowRight className="w-5 h-5" /></>}
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-purple-400" /> Aplicação sujeita à aprovação!
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
