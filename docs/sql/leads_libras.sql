CREATE TABLE IF NOT EXISTS leads_libras (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NULL,
  email VARCHAR(180) NULL,
  telefone VARCHAR(40) NULL,
  empresa VARCHAR(200) NULL,
  tipoServico VARCHAR(80) NULL,
  dataEvento DATE NULL,
  local_evento VARCHAR(200) NULL,
  tamanhoPublico VARCHAR(80) NULL,
  duracao VARCHAR(80) NULL,
  linkVideo TEXT NULL,
  descricao TEXT NULL,
  origem VARCHAR(60) NOT NULL DEFAULT 'site',
  mensagem TEXT NULL,
  lgpdConsent TINYINT(1) DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (email), INDEX (telefone), INDEX (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
