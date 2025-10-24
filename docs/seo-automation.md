# Automação de SEO (sitemap, JSON-LD e metatags)

## 1. Sitemap dinâmico (`/sitemap.xml`)
- Endpoint: `GET https://example.com/sitemap.xml`
- Conteúdo: XML válido com `Content-Type: application/xml`.
- URLs incluídas:
  - Home (`/`) com prioridade `1.0`.
  - Blog (`/blog`) com prioridade `0.9`.
  - Páginas institucionais fixas (`/cases`, `/servicos`, `/contato`) com prioridade `0.7`.
  - Todos os slugs publicados em `blog_posts` expostos como `/blog/:slug` com prioridade `0.8` e `<lastmod>` baseado na coluna `updated_at` (fallback para `data_publicacao`/`created_at`).
- Cache: resultado mantido em memória por `SITEMAP_CACHE_SECONDS` (padrão 300s). Atualizações de posts expiram o cache ao reiniciar a API ou após o TTL.
- Boas práticas:
  - Rebuild manual via `curl -I https://example.com/sitemap.xml` após publicar posts para confirmar cache novo.
  - Invalidar Cloudflare/Plesk cache se estiver ativado.

## 2. SEO por artigo (`/api/post/:slug/seo`)
- Endpoint gera automaticamente JSON-LD, Open Graph e Twitter Cards.
- Retorno base:

```json
{
  "slug": "como-integrar-whatsapp-cloud-api",
  "jsonLd": {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Como integrar WhatsApp Cloud API",
    "description": "Guia completo com passos e checklist.",
    "image": "https://example.com/uploads/whatsapp.png",
    "author": {
      "@type": "Organization",
      "name": "Equipe Winove"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Winove",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/assets/images/publisher-logo.png"
      }
    },
    "datePublished": "2024-07-12T10:00:00.000Z",
    "dateModified": "2024-07-18T15:32:00.000Z",
    "mainEntityOfPage": "https://example.com/blog/como-integrar-whatsapp-cloud-api"
  },
  "meta": {
    "title": "Como integrar WhatsApp Cloud API | Winove",
    "description": "Guia completo com passos e checklist.",
    "canonical": "https://example.com/blog/como-integrar-whatsapp-cloud-api",
    "openGraph": {
      "og:type": "article",
      "og:url": "https://example.com/blog/como-integrar-whatsapp-cloud-api",
      "og:title": "Como integrar WhatsApp Cloud API | Winove",
      "og:description": "Guia completo com passos e checklist.",
      "og:image": "https://example.com/uploads/whatsapp.png",
      "article:published_time": "2024-07-12T10:00:00.000Z",
      "article:modified_time": "2024-07-18T15:32:00.000Z"
    },
    "twitter": {
      "twitter:card": "summary_large_image",
      "twitter:title": "Como integrar WhatsApp Cloud API | Winove",
      "twitter:description": "Guia completo com passos e checklist.",
      "twitter:image": "https://example.com/uploads/whatsapp.png",
      "twitter:url": "https://example.com/blog/como-integrar-whatsapp-cloud-api"
    }
  }
}
```

## 3. Inserção no `<head>` do React (Helmet)

```tsx
import { SEO } from '@/lib/seo';
import { Helmet } from 'react-helmet-async';

export function BlogPostSEO({ seo }: { seo: Awaited<ReturnType<typeof fetchSeo>> }) {
  return (
    <>
      <SEO
        title={seo.meta.title}
        description={seo.meta.description}
        canonical={seo.meta.canonical}
        image={seo.meta.openGraph['og:image']}
        type="article"
        jsonLd={seo.jsonLd}
      />

      <Helmet>
        <meta property="article:published_time" content={seo.meta.openGraph['article:published_time']} />
        <meta property="article:modified_time" content={seo.meta.openGraph['article:modified_time']} />
        <meta name="twitter:card" content={seo.meta.twitter['twitter:card']} />
        <meta name="twitter:title" content={seo.meta.twitter['twitter:title']} />
        <meta name="twitter:description" content={seo.meta.twitter['twitter:description']} />
        <meta name="twitter:image" content={seo.meta.twitter['twitter:image']} />
      </Helmet>
    </>
  );
}
```

## 4. Robots.txt e Search Console
- Adicionar `Sitemap: https://example.com/sitemap.xml` no topo do `robots.txt` (ou usar o caminho relativo `/sitemap.xml`).
- Após publicar posts:
  1. Acesse o Google Search Console > propriedade `example.com`.
  2. Em **Sitemaps**, envie/atualize `sitemap.xml` para forçar recrawl.
  3. Use **Inspeção de URL** para cada novo slug e solicitar indexação.
- Se usar Bing/Webmaster Tools, repetir com o mesmo sitemap.
- Monitorar a cobertura de indexação para detectar erros de `lastmod` ou URLs órfãs.

## 5. Dicas de atualização
- Sempre publicar os posts via backend para manter `updated_at` consistente.
- Ao atualizar conteúdo antigo, confirmar que o campo `updated_at` foi alterado (ou executar `UPDATE` manual).
- Manter uma imagem de compartilhamento padrão (`DEFAULT_SHARE_IMAGE`) configurada via variável de ambiente para evitar cartões vazios.
- Em ambientes de staging, ajustar `APP_BASE_URL` para evitar URLs indexadas com domínios temporários.
