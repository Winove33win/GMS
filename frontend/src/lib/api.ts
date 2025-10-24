import axios from 'axios';

export interface Template {
  slug: string;
  category?: string;
  difficulty?: string;
  title: string;
  description?: string;
  tags?: string[];
  images: {
    cover: string;
  };
  price: number;
  originalPrice?: number;
  pages?: number;
}

// In Vite, env vars come from import.meta.env
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
});

export const fetchTemplate = async (slug: string): Promise<Template> => {
  const res = await api.get<Template>(`/templates/${slug}`);
  return res.data;
};

export const fetchTemplates = async (): Promise<Template[]> => {
  const res = await api.get<Template[]>(`/templates`);
  return res.data;
};
