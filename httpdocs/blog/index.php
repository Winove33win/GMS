<script>
  document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/blog-posts")
      .then(res => res.json())
      .then(posts => {
        const container = document.getElementById("blogContainer");

        if (!posts.length) {
          container.innerHTML = "<p>Nenhum post disponível no momento.</p>";
          return;
        }

        container.innerHTML = ""; // limpa

        posts.forEach(post => {
          const div = document.createElement("div");
          div.classList.add("post");

          div.innerHTML = `
            <div class="post-card">
              <img src="${post.imagem}" alt="${post.titulo}" class="post-thumb" />
              <h3>${post.titulo}</h3>
              <p>${post.resumo}</p>
              <a href="/blog/${post.slug}" class="post-link">Leia mais</a>
              <p class="post-meta">${post.criado_em} • ${post.autor || "Winove"}</p>
            </div>
          `;

          container.appendChild(div);
        });

        const baseUrl = window.location.origin.replace(/\/$/, '');

        const ldJson = {
          "@context": "https://schema.org",
          "@type": "Blog",
          "blogPost": posts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.titulo,
            "image": post.imagem,
            "author": {
              "@type": "Person",
              "name": post.autor || "Winove"
            },
            "datePublished": post.criado_em,
            "description": post.resumo,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${baseUrl}/blog/${post.slug}`
            }
          }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(ldJson);
        document.head.appendChild(script);
      })
      .catch(err => {
        console.error("Erro ao carregar posts:", err);
      });
  });
</script>
