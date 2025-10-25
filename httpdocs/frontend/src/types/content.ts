export type Mentor = {
  id: string;
  nome: string;
  bio: string;
  areas: string[];
  cidade: string;
  linkedin: string;
  fotoUrl?: string;
};

export type Mentee = {
  id: string;
  nome: string;
  descricao: string;
  necessidades: string[];
  cidade: string;
  contatos: {
    email: string;
    site?: string;
  };
  ods: string[];
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  titulo: string;
  descricao_curta: string;
  descricao_long?: string;
  status: string;
  ods: string[];
  cidade?: string;
  mentores: string[];
  amentorados: string[];
  metricas?: ProjectMetric[];
  ano_inicio?: number;
  ano_fim?: number;
  links?: { label: string; url: string }[];
};

export type Partner = {
  nome: string;
  descricao: string;
  link?: string;
  tipo?: string;
};

export type Goal = {
  ods: string;
  meta: string;
  indicadores: string[];
};

export type Meeting = {
  data: string;
  formato: string;
  resumo: string;
  pauta: string;
  link: string;
  projetos: string[];
};

export type BlogSummary = {
  slug: string;
  title: string;
  excerpt: string;
  date?: string;
  categories?: string[];
};
