<?php
// Lista simples de posts (sem paginação), usada na home e fallback
header("Content-Type: application/json; charset=UTF-8");

$dbHost = getenv('DB_HOST') ?: '127.0.0.1';
$conn = new mysqli($dbHost, "winove", "9*19avmU0", "fernando_winove_com_br_");

if ($conn->connect_error) {
  http_response_code(500);
  echo json_encode(["error" => "Erro de conexao com o banco"]);
  exit;
}

$sql = "SELECT id,
               titulo           AS title,
               slug             AS slug,
               resumo           AS excerpt,
               conteudo         AS content,
               imagem_destacada AS coverImage,
               data_publicacao  AS date,
               autor            AS author,
               categoria        AS category
        FROM blog_posts
        ORDER BY data_publicacao DESC";

$result = $conn->query($sql);

$posts = [];
if ($result) {
  while ($row = $result->fetch_assoc()) {
    $posts[] = $row;
  }
}

echo json_encode($posts, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
$conn->close();
?>

