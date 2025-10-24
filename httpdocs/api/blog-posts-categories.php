<?php
// Lista categorias com contagem
header("Content-Type: application/json; charset=UTF-8");

$dbHost = getenv('DB_HOST') ?: '127.0.0.1';
$conn = new mysqli($dbHost, "winove", "9*19avmU0", "fernando_winove_com_br_");

if ($conn->connect_error) {
  http_response_code(500);
  echo json_encode(["error" => "Erro de conexao com o banco"]);
  exit;
}

$sql = "SELECT categoria AS category, COUNT(*) AS count
        FROM blog_posts
        GROUP BY categoria
        ORDER BY count DESC";

$result = $conn->query($sql);
$items = [];
if ($result) {
  while ($row = $result->fetch_assoc()) {
    $items[] = [
      'category' => $row['category'] !== null && $row['category'] !== '' ? $row['category'] : 'Sem categoria',
      'count' => intval($row['count'] ?? 0),
    ];
  }
}

echo json_encode($items, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
$conn->close();
?>

