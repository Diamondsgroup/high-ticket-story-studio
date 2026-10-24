export const FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbx9I9n4GFBuljmD9YB2_9zRh-lRpBNl6aOJxr7xFBgOjnWOGlDoq785z5tE2wpKZ3Ju3Q/exec';

export type FormQuestion =
  | { id: string; type: 'text' | 'tel' | 'email'; label: string; placeholder: string; required: boolean; autoComplete?: string }
  | { id: string; type: 'choice'; label: string; options: string[]; required: boolean };

export const formQuestions: FormQuestion[] = [
  { id: 'nome', type: 'text', label: 'Qual é o seu nome?', placeholder: 'Nome completo', required: true, autoComplete: 'name' },
  { id: 'whatsapp', type: 'tel', label: 'Seu WhatsApp com DDD', placeholder: '(11) 99999-9999', required: true, autoComplete: 'tel' },
  { id: 'email', type: 'email', label: 'Seu melhor e-mail', placeholder: 'voce@email.com', required: true, autoComplete: 'email' },
  { id: 'instagram', type: 'text', label: 'Seu @ do Instagram (opcional)', placeholder: '@seuperfil', required: false },
  {
    id: 'faturamento',
    type: 'choice',
    label: 'Qual é o seu faturamento mensal atual?',
    options: ['Ainda não faturo', 'Até R$ 20 mil/mês', 'R$ 20 mil a 50 mil/mês', 'R$ 50 mil a 100 mil/mês', 'Mais de R$ 100 mil/mês'],
    required: true,
  },
  {
    id: 'modelo',
    type: 'choice',
    label: 'Qual é o seu modelo de negócio?',
    options: ['E-commerce / Dropshipping', 'Infoproduto', 'Negócio local / Serviços', 'Outro'],
    required: true,
  },
];
