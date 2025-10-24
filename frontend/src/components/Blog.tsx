import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: string;
  category?: string;
}

function readingTime(content: string): string {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

export const Blog = () => {
  const [articles, setArticles] = useState<Post[] | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/blog-posts`);
        if (res.ok) {
          const data: Post[] = await res.json();
          setArticles(data.slice(0, 6));
        } else {
          console.error("API Error:", res.status, res.statusText);
          const text = await res.text();
          console.error("Response body:", text);
        }
      } catch (err) {
        console.error("fetch blog-posts", err);
      }
    };
    load();
  }, []);

  if (!articles) {
    return <p>Carregando...</p>;
  }

  return (
    <section id="blog" className="py-24 bg-gradient-navy relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Blog & Insights
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Conteúdos exclusivos, tendências e estratégias para manter seu negócio sempre à frente
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.length === 0 ? (
              <p>Nenhum post disponível no momento</p>
            ) : (
              articles.map((article, index) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="block"
                >
                <article
                  className="glass rounded-2xl overflow-hidden hover-lift group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Article Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

                    {/* Read Time */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full glass text-muted-foreground border border-border/20">
                        {readingTime(article.content)}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300 text-sm font-medium group/btn">
                      Ler artigo
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
              ))
            )}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link to="/blog" className="btn-secondary px-8 py-4 text-lg">
              Ver Todos os Artigos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};