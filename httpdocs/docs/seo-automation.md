# Automação de SEO

As páginas são renderizadas a partir do template HTML base em `backend/utils/htmlTemplate.js`. Os metadados são injetados na rota correspondente
com a função `renderTemplateWithMeta`, que já cobre:

- `<title>` e `<meta name="description">`
- Open Graph (`og:type`, `og:title`, `og:description`, `og:image`)
- Cartões do Twitter (`summary_large_image`)
- Bloco JSON-LD configurável por página

Para atualizar imagens sociais sem subir binários ao repositório, utilize o `frontend/assets/manifest.json` com valores Base64 e execute o script
`npm install` (ou `npm run postinstall`) para reconstruir os arquivos físicos através de `frontend/scripts/decode-assets.mjs`.
