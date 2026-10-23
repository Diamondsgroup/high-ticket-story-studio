import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade" },
      {
        name: "description",
        content:
          "Política de Privacidade — como tratamos dados de visitantes, incluindo o Pixel do Meta.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#020205] px-4 py-16 sm:px-6 text-slate-300">
      <div className="mx-auto max-w-2xl space-y-6 text-sm leading-relaxed">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Política de Privacidade
        </h1>

        <p>
          Este site usa o Pixel do Meta (Facebook) para medir o desempenho de
          campanhas de publicidade. Ao carregar a página fora das regiões que
          exigem consentimento prévio, enviamos ao Meta informações sobre sua
          visita, como páginas acessadas e informações técnicas do
          dispositivo/navegador, com a finalidade de medição de público e
          otimização de anúncios.
        </p>

        <p>
          Nas regiões que exigem consentimento (como o Espaço Econômico
          Europeu, o Reino Unido e a Suíça), o Pixel permanece desativado até
          que um mecanismo de consentimento seja disponibilizado e você aceite.
        </p>

        <p>
          Você pode solicitar a exclusão de seus dados ou esclarecer dúvidas
          sobre este tratamento entrando em contato conosco pelo canal de
          atendimento informado nesta página. É possível, ainda, alterar as
          preferências de anúncios diretamente nas configurações da sua conta
          Meta/Facebook.
        </p>

        <p className="text-xs text-slate-500">
          Este site não possui vínculo institucional com o TikTok, ByteDance ou
          com a Meta Inc.
        </p>

        <Link
          to="/"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </main>
  );
}
