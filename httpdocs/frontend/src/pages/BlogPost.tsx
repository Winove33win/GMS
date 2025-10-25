import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { api, type BlogPost as BlogPostData } from '@/lib/api';

function parseMarkdown(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const elements: { type: 'h1' | 'h2' | 'p'; content: string }[] = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return;
    }
    if (trimmed.startsWith('## ')) {
      elements.push({ type: 'h2', content: trimmed.replace(/^##\s+/, '') });
    } else if (trimmed.startsWith('# ')) {
      elements.push({ type: 'h1', content: trimmed.replace(/^#\s+/, '') });
    } else {
      elements.push({ type: 'p', content: trimmed });
    }
  });

  return elements;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    api
      .getPost(slug)
      .then(setPost)
      .catch(() => setError('Não foi possível carregar este conteúdo.'));
  }, [slug]);

  const parsed = useMemo(() => (post ? parseMarkdown(post.markdown) : []), [post]);
  const title = parsed.find((item) => item.type === 'h1')?.content ?? 'Conteúdo GMS';

  if (error) {
    return (
      <div className="space-y-4">
        <Seo title="Post não encontrado" description="Conteúdo indisponível." />
        <p className="text-sm text-ink-600">{error}</p>
        <Button variant="secondary" onClick={() => navigate('/blog')}>
          Voltar para o blog
        </Button>
      </div>
    );
  }

  if (!post) {
    return <p className="text-sm text-ink-600">Carregando post…</p>;
  }

  return (
    <article className="space-y-6">
      <Seo title={title} description={post.markdown.slice(0, 140)} />
      <Button variant="ghost" onClick={() => navigate(-1)} className="px-0 text-brand-green">
        ← Voltar
      </Button>
      <div className="space-y-6">
        {parsed.map((item, index) => {
          if (item.type === 'h1') {
            return (
              <h1 key={index} className="text-4xl font-bold text-ink-900">
                {item.content}
              </h1>
            );
          }
          if (item.type === 'h2') {
            return (
              <h2 key={index} className="text-2xl font-semibold text-ink-900">
                {item.content}
              </h2>
            );
          }
          return (
            <p key={index} className="text-lg leading-8 text-ink-700">
              {item.content}
            </p>
          );
        })}
      </div>
    </article>
  );
}
