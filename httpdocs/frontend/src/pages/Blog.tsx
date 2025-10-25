import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { api, type BlogSummary } from '@/lib/api';

export default function Blog() {
  const [posts, setPosts] = useState<BlogSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .listBlog()
      .then(setPosts)
      .catch(() => setError('Não foi possível carregar os conteúdos agora.'));
  }, []);

  return (
    <div className="space-y-12">
      <Seo title="Blog GMS" description="Histórias, aprendizados e boas práticas compartilhadas pela comunidade GMS." />
      <section className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-green">Conteúdo</span>
          <h1 className="text-4xl font-bold text-ink-900">Blog &amp; insights</h1>
          <p className="max-w-3xl text-lg text-ink-600">
            Conheça histórias, metodologias e registros das mentorias. Publicamos registros das rodadas, entrevistas e estudos de
            caso.
          </p>
        </div>
      </section>

      {error && <p className="rounded-2xl bg-brand-amber/20 p-4 text-sm text-ink-900">{error}</p>}

      <section className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="card-surface flex h-full flex-col gap-4 rounded-3xl p-6 transition duration-200 ease-gentle-out hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-green"
          >
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">{post.date}</span>
              <h2 className="text-2xl font-semibold text-ink-900">{post.title}</h2>
            </div>
            <p className="flex-1 text-sm text-ink-600">{post.excerpt}</p>
            <Button asChild variant="ghost" className="w-fit px-0 text-brand-green">
              <span>Ler mais →</span>
            </Button>
          </Link>
        ))}
      </section>
    </div>
  );
}
