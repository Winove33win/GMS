import re
from urllib.parse import urlparse
import requests


def slug_from_link(link: str, idx: int) -> str:
    """Return a slug from a link or fallback to post-{idx} when link is empty."""
    if link:
        # Take last segment of path
        path = urlparse(link).path.rstrip('/')
        slug = path.split('/')[-1]
        slug = re.sub(r"[^a-z0-9-]+", "-", slug.lower()).strip('-')
        if slug:
            return slug
    return f"post-{idx}"


def fetch_posts():
    """Try to fetch posts from WordPress API; fallback to sample posts."""
    url = "https://example.com/wp-json/wp/v2/posts?per_page=100&_fields=title.rendered,link,excerpt.rendered,content.rendered,date,author"
    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        posts = []
        for item in data:
            posts.append(
                {
                    "title": item.get("title", {}).get("rendered", ""),
                    "link": item.get("link", ""),
                    "excerpt": item.get("excerpt", {}).get("rendered", ""),
                    "content": item.get("content", {}).get("rendered", ""),
                    "featured_image": "",
                    "date": item.get("date", ""),
                    "author": str(item.get("author", "")),
                }
            )
        if posts:
            return posts
    except Exception as exc:
        print(f"Falha ao buscar posts: {exc}. Usando posts de exemplo.")

    # Fallback posts
    return [
        {
            "title": "Bem-vindo ao Blog",
            "link": "https://exemplo.com/bem-vindo-ao-blog",
            "excerpt": "Post inaugural dando boas vindas ao blog.",
            "content": "<p>Este é o nosso primeiro post no blog!</p>",
            "featured_image": "https://exemplo.com/post1.jpg",
            "date": "2025-07-31 16:20:27",
            "author": "Admin",
        },
        {
            "title": "Novidades da Plataforma",
            "link": "https://exemplo.com/novidades-da-plataforma",
            "excerpt": "Veja o que mudou na última atualização.",
            "content": "<p>Muitas melhorias implementadas.</p>",
            "featured_image": "https://exemplo.com/post2.jpg",
            "date": "2025-07-31 16:20:27",
            "author": "Admin",
        },
        {
            "title": "Dicas de Produtividade",
            "link": "https://exemplo.com/dicas-de-produtividade",
            "excerpt": "Pequenas ações para melhorar seu dia a dia.",
            "content": "<p>Confira nossas dicas valiosas.</p>",
            "featured_image": "https://exemplo.com/post3.jpg",
            "date": "2025-07-31 16:20:27",
            "author": "Equipe Winove",
        },
    ]


def escape(value: str) -> str:
    return value.replace("'", "''")


def main():
    posts = fetch_posts()
    lines = [
        "INSERT INTO blog_posts (titulo, slug, resumo, conteudo, imagem_destacada, data_publicacao, autor) VALUES"
    ]
    values = []
    for idx, post in enumerate(posts, 1):
        slug = slug_from_link(post.get("link", ""), idx)
        values.append(
            "('" + escape(post.get("title", "")) + "', '" + slug + "', '" + escape(post.get("excerpt", "")) + "', '" + escape(post.get("content", "")) + "', '" + escape(post.get("featured_image", "")) + "', '" + post.get("date", "") + "', '" + escape(post.get("author", "")) + "')"
        )
    lines.append(",\n".join(values) + ";")

    with open("blog_posts.sql", "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


if __name__ == "__main__":
    main()
