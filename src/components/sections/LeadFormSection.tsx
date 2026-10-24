import React, { useState } from 'react';
import { z } from 'zod';
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { trackLead } from '../../lib/metaPixel';

const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbx9I9n4GFBuljmD9YB2_9zRh-lRpBNl6aOJxr7xFBgOjnWOGlDoq785z5tE2wpKZ3Ju3Q/exec';

const schema = z.object({
  nome: z.string().trim().min(2, 'Informe seu nome').max(100),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[\d\s()+-]{10,20}$/, 'WhatsApp com DDD inválido'),
  email: z.string().trim().email('E-mail inválido').max(255),
  instagram: z.string().trim().max(60).optional(),
  faturamento: z.string().min(1, 'Selecione o faturamento'),
  modelo: z.string().min(1, 'Selecione o modelo de negócio'),
});

const FATURAMENTO = ['Ainda não faturo', 'Até R$ 20 mil/mês', 'R$ 20 mil a 50 mil/mês', 'R$ 50 mil a 100 mil/mês', 'Mais de R$ 100 mil/mês'];
const MODELO = ['E-commerce / Dropshipping', 'Infoproduto', 'Negócio local / Serviços', 'Outro'];

const field =
  'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3.5 text-base text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition';

export const LeadFormSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('sending');
    const eventId = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    try {
      const body = JSON.stringify({
        ...parsed.data,
        instagram: parsed.data.instagram ?? '',
        data: new Date().toISOString(),
        origem: window.location.href,
      });
      await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body,
      });
      trackLead(eventId);
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="aplicar" className="relative scroll-mt-4 py-8 sm:py-12 px-4 sm:px-6 bg-[#020205]">
      <div className="max-w-xl mx-auto rounded-3xl border border-purple-500/25 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-8 shadow-[0_10px_60px_rgba(168,85,247,0.18)]">
        {status === 'ok' ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-14 h-14 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-white mb-2">Aplicação recebida!</h3>
            <p className="text-slate-300">Vamos analisar seu perfil e entrar em contato pelo WhatsApp.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Aplique para a implementação</h3>
              <p className="text-slate-400 text-sm mt-2">Leva menos de 1 minuto.</p>
            </div>
            <form onSubmit={onSubmit} noValidate className="space-y-3">
              {[
                { n: 'nome', p: 'Nome completo', t: 'text', a: 'name' },
                { n: 'whatsapp', p: 'WhatsApp com DDD', t: 'tel', a: 'tel' },
                { n: 'email', p: 'E-mail', t: 'email', a: 'email' },
                { n: 'instagram', p: '@ do Instagram (opcional)', t: 'text', a: 'off' },
              ].map((f) => (
                <div key={f.n}>
                  <input name={f.n} type={f.t} placeholder={f.p} autoComplete={f.a} maxLength={255} className={field} />
                  {errors[f.n] && <p className="text-xs text-red-400 mt-1">{errors[f.n]}</p>}
                </div>
              ))}
              {[
                { n: 'faturamento', p: 'Faturamento mensal atual', o: FATURAMENTO },
                { n: 'modelo', p: 'Modelo de negócio', o: MODELO },
              ].map((s) => (
                <div key={s.n}>
                  <select name={s.n} defaultValue="" className={`${field} appearance-none`}>
                    <option value="" disabled className="bg-[#0b0b12]">{s.p}</option>
                    {s.o.map((o) => (
                      <option key={o} value={o} className="bg-[#0b0b12]">{o}</option>
                    ))}
                  </select>
                  {errors[s.n] && <p className="text-xs text-red-400 mt-1">{errors[s.n]}</p>}
                </div>
              ))}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#7c3aed] shadow-xl shadow-purple-900/40 disabled:opacity-60"
              >
                {status === 'sending' ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Quero agendar <ArrowRight className="w-5 h-5" /></>}
              </button>
              {status === 'error' && <p className="text-sm text-red-400 text-center">Não foi possível enviar. Tente novamente.</p>}
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-purple-400" /> Aplicação sujeita à aprovação!
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
};
