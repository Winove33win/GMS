<?php
// slug.php
$slug = $_GET['slug'] ?? null;

if (!$slug) {
  http_response_code(400);
  echo "Slug inválido.";
  exit;
}

$dbHost = getenv('DB_HOST') ?: '127.0.0.1';
$conn = new mysqli($dbHost, "winove", "9*19avmU0", "fernando_winove_com_br_");
if ($conn->connect_error) {
  die("Erro de conexão com o banco de dados.");
}

$stmt = $conn->prepare("SELECT * FROM blog_posts WHERE slug = ?");
$stmt->bind_param("s", $slug);
$stmt->execute();
$result = $stmt->get_result();

$post = $result->fetch_assoc();

if (!$post) {
  echo "<h1>Post não encontrado</h1>";
  exit;
}

$baseFromEnv = getenv('APP_BASE_URL') ?: getenv('PUBLIC_BASE_URL');
if ($baseFromEnv) {
  $baseUrl = rtrim($baseFromEnv, '/');
} else {
  $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ||
    (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443);
  $scheme = $isHttps ? 'https' : 'http';
  $defaultSite = getenv('SITE_URL') ?: 'https://confident-heyrovsky.168-75-84-128.plesk.page';
  $fallbackHost = parse_url($defaultSite, PHP_URL_HOST) ?: 'confident-heyrovsky.168-75-84-128.plesk.page';
  $host = $_SERVER['HTTP_HOST'] ?? $fallbackHost;
  $baseUrl = $scheme . '://' . $host;
}

$normalizedBase = rtrim($baseUrl, '/');
$canonicalUrl = $normalizedBase . '/blog/' . rawurlencode($slug);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title><?= htmlspecialchars($post['titulo']) ?></title>
  <meta name="description" content="<?= htmlspecialchars($post['resumo'] ?? '') ?>" />
  <link rel="canonical" href="<?= htmlspecialchars($canonicalUrl, ENT_QUOTES) ?>" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": <?= json_encode($post['titulo']) ?>,
    "image": <?= json_encode($post['imagem']) ?>,
    "author": {
      "@type": "Person",
      "name": <?= json_encode($post['autor']) ?>
    },
    "datePublished": <?= json_encode(date(DATE_ATOM, strtotime($post['criado_em']))) ?>,
    "dateModified": <?= json_encode(date(DATE_ATOM, strtotime($post['criado_em']))) ?>,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": <?= json_encode($canonicalUrl) ?>
    },
    "description": <?= json_encode($post['resumo'] ?? '') ?>
  }
  </script>
  <style>
    body { font-family: Arial; max-width: 800px; margin: auto; padding: 20px; }
    img { max-width: 100%; margin-bottom: 20px; }
    h1 { color: #333; }
    .meta { font-size: 0.9em; color: #777; margin-bottom: 30px; }
  </style>
</head>
<body>

  <h1><?= htmlspecialchars($post['titulo']) ?></h1>
  <div class="meta">Publicado em <?= date("d/m/Y", strtotime($post['criado_em'])) ?> por <?= htmlspecialchars($post['autor']) ?></div>

  <img src="<?= htmlspecialchars($post['imagem']) ?>" alt="Imagem destacada" />

  <div>
    <?= $post['conteudo'] ?>
  </div>

</body>
</html>
