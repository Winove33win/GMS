const BASE = (import.meta as any).env?.VITE_API_BASE || '/api';

type FetchOptions = RequestInit | undefined;

export type ProjectRecord = {
  slug: string;
  titulo: string;
  descricao_curta: string;
  descricao_long?: string;
  status: string;
  ods: string[];
  area?: string;
  cidade?: string;
  mentores: string[];
  amentorados: string[];
  metricas?: { label: string; value: string }[];
  ano_inicio?: number;
  ano_fim?: number;
  links?: { label: string; url: string }[];
};

export type BlogSummary = {
  slug: string;
  title: string;
  excerpt: string;
};

export type BlogPost = {
  slug: string;
  markdown: string;
};

async function jsonFetch<T>(input: string, init?: FetchOptions): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  listProjects: () => jsonFetch<ProjectRecord[]>(`${BASE}/cases`),
  getProject: (slug: string) => jsonFetch<ProjectRecord>(`${BASE}/cases/${slug}`),
  listBlog: () => jsonFetch<BlogSummary[]>(`${BASE}/blog-posts`),
  getPost: (slug: string) => jsonFetch<BlogPost>(`${BASE}/blog-posts/${slug}`),
};
