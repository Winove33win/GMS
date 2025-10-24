import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, BlogPost as BlogPostData } from '../lib/api';

const renderMarkdown = (markdown: string) => {
  const lines = markdown.split(/\r?\n/).map((line, index) => {
    if (line.startsWith('# ')) {
      return (
        <h1 key={index} className="text-3xl font-semibold text-brand-dark">
          {line.replace(/^#\s+/, '')}
        </h1>
      );
    }
    if (line.startsWith('## ')) {
      return (
        <h2 key={index} className="text-2xl font-semibold text-brand-dark">
          {line.replace(/^##\s+/, '')}
        </h2>
      );
    }
    if (!line.trim()) {
      return <br key={index} />;
    }
    return (
      <p key={index} className="text-neutral-700">
        {line}
      </p>
    );
  });

  return <div className="space-y-4">{lines}</div>;
};

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostData | null>(null);

  useEffect(() => {
    if (!slug) return;
    api
      .getPost(slug)
      .then(setPost)
      .catch((err) => console.error('Erro ao carregar post', err));
  }, [slug]);

  if (!post) {
    return <p className="text-neutral-500">Carregando post…</p>;
  }

  return <article className="space-y-6">{renderMarkdown(post.markdown)}</article>;
};

export default BlogPost;
