import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, BlogSummary } from '../lib/api';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogSummary[]>([]);

  useEffect(() => {
    api
      .listBlog()
      .then(setPosts)
      .catch((err) => console.error('Erro ao carregar blog', err));
  }, []);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-brand-dark">Blog &amp; Insights</h1>
        <p className="text-neutral-600">
          Histórias, aprendizados e boas práticas compartilhadas pela comunidade da Mentoria Solidária.
        </p>
      </header>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-brand-dark">{post.title}</h2>
            <p className="mt-2 text-sm text-neutral-600">{post.excerpt}</p>
            <span className="mt-3 inline-flex text-sm font-semibold text-brand-green">Ler mais</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Blog;
