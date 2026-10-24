import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { MultiStepForm } from '@/components/form/MultiStepForm';

export const Route = createFileRoute('/aplicar')({
  head: () => ({
    meta: [
      { title: 'Qualificação | Movimento A Contramão' },
      { name: 'description', content: 'Envie sua aplicação para a implementação estratégica personalizada de TikTok Ads do Movimento A Contramão.' },
      { property: 'og:title', content: 'Qualificação | Movimento A Contramão' },
      { property: 'og:description', content: 'Candidate-se à implementação estratégica personalizada de TikTok Ads.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap' }],
  }),
  component: QualificationPage,
});

function QualificationPage() {
  return (
    <main className="qualification-page flex min-h-svh flex-col px-4 py-6 sm:px-6">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4">
        <Link to="/" aria-label="Voltar à página inicial" className="text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-5" />
        </Link>
        <img src="/images/contramao-horizontal.png" alt="Movimento A Contramão" className="h-10 max-w-[200px] object-contain" />
      </header>
      <div className="flex flex-1 items-center justify-center py-8">
        <MultiStepForm variant="inline" />
      </div>
      <footer className="text-center text-xs text-muted-foreground">
        <Link to="/privacidade" className="hover:text-foreground">Política de Privacidade</Link>
      </footer>
    </main>
  );
}