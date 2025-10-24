# Arquitetura do Site da Mentoria Solidária (GMS)

Este documento define a espinha dorsal do novo site da Mentoria Solidária, alinhando rotas, coleções do CMS, fluxos de UX e componentes reutilizáveis com o propósito, visão e práticas do programa.

## Visão Geral da Plataforma

O site deve comunicar o propósito socioambiental da GMS, apresentar seu ecossistema de mentoria e facilitar a entrada de novas pessoas mentoras e empreendedoras. O conteúdo precisa reforçar:

- Propósito e visão (impacto socioambiental e inovação colaborativa).
- Funcionamento da comunidade: encontros semanais às quintas, formato sem CNPJ e sem fins lucrativos, origens na Baita/Unicamp.
- Projetos em diferentes estágios, metas 2025–2028 e alinhamento com os ODS.
- Canais oficiais (LinkedIn, Telegram, WhatsApp) e formulários de engajamento.

## Páginas e Rotas

| Rota | Conteúdo principal |
| --- | --- |
| `/` | Hero com chamada principal, propósito, visão, métricas agregadas, CTA para mentores/as e empreendedores/as, logos de parceiros, projetos em destaque. |
| `/sobre` | História 2019–2024, origem na Baita/Unicamp, formato colaborativo (sem CNPJ), como operamos, fotos e depoimentos. |
| `/mentores` | Listagem filtrável de mentores/as com cards por área de atuação. |
| `/amentorados` | Listagem de empreendedores/as ou projetos incubados, destacando pessoas e iniciativas. |
| `/projetos` | Portfólio filtrável por ODS, área e status; integra cards com link para página individual. |
| `/projetos/[slug]` | Página detalhada de cada projeto (descrição, ODS, status, métricas, mentores/as, parceiros/as, mídias, aprendizados). |
| `/parcerias` | Ecossistema de cooperação (ITT, ANITEC, IPISA etc.) com logos, descrições e links. |
| `/encontros` | Agenda fixa das quintas (16h–17h30 no Google Meet), formulário de inscrição, histórico, materiais e instruções. |
| `/roteiro` | Guia “Como apresentar seu projeto” com as cinco perguntas obrigatórias e exemplos. |
| `/metas` | Metas e OKRs 2025–2028, indicadores públicos e contadores. |
| `/blog` | Artigos e notícias com categorias (ODS, Relatos, Boas Práticas, Agenda). |
| `/contato` | Formulários para ser mentor/a, apresentar projeto, propor parceria; links para canais oficiais. |

## Estrutura do CMS

As coleções abaixo servem tanto para Wix Studio quanto para a alternativa Next.js + Supabase.

### Pessoas

- **Mentores**: nome, bio curta, áreas (tags), cidade/UF, foto, LinkedIn, disponibilidade, status (ativo/em validação).
- **Amentorados (Empreendedores)**: nome, organização, bio/descrição, cidade/UF, contatos, projetos vinculados.

### Projetos

Campos obrigatórios:

- `titulo`
- `slug`
- `descricao_curta`
- `descricao_longa`
- `status` (Ideação, Em andamento, Concluído)
- `ods` (multi-tag com referência aos ODS da ONU)
- `area` (educação, saúde, assistência social, ambiente etc.)
- `cidade_uf`
- `parceiros[]`
- `mentores[]`
- `amentorados[]`
- `metricas` (nº participantes, impacto, alcance)
- `midias[]` (imagens, vídeos, documentos)
- `ano_inicio`
- `ano_fim`
- `aprendizados`

### Parcerias

- `titulo`
- `tipo` (instituição, rede, aceleradora)
- `descricao`
- `link`
- `logo`
- `contatos`
- `projetos_relacionados[]`

### Encontros / Agenda

- `data`
- `formato` (online, presencial, híbrido)
- `resumo`
- `pauta`
- `projetos_atendidos[]`
- `link_meet`
- `materiais[]`
- Regras de recorrência: quintas-feiras, 16h–17h30, com possibilidade de exceções.

### Conteúdo Institucional

- **PropositoVisao**: propósito, visão, áreas de atuação, números agregados (reuniões, participantes, projetos).
- **MetasOKR**: metas 2025–2028 com chaves/objetivos e resultados-chave.

### Blog

- `titulo`
- `slug`
- `resumo`
- `conteudo_rico`
- `categoria` (ODS, Relatos, Boas Práticas, Agenda)
- `tags`
- `projeto_relacionado`
- `autor`
- `data_publicacao`

### Depoimentos & Histórias

Coleção para registros de 5 anos de atuação:

- `titulo`
- `tipo` (texto, áudio, vídeo)
- `conteudo`
- `pessoa_relacionada`
- `projeto_relacionado`
- `data`

### Canais

Coleção para metadados de canais oficiais:

- `nome`
- `plataforma`
- `link`
- `descricao`
- `icone`
- `prioridade`

## Componentes e Seções Reutilizáveis

- **Hero principal** com chamada “Mentoria Solidária: inovação e impacto socioambiental”.
- **Bloco Propósito & Visão** com CTA.
- **Cards de Projeto** exibindo ODS, status e tags de área.
- **Filtro por ODS/Área** com chips clicáveis.
- **Bloco Como Participar** com duas colunas (Mentores x Empreendedores).
- **Bloco Roteiro de Apresentação** com as cinco perguntas do pitch.
- **Métricas rápidas** com contadores (reuniões totais, participantes, projetos apoiados).
- **Carrossel de Parcerias** com logos e links.
- **CTA para Canais** destacando LinkedIn, Telegram e WhatsApp.
- **Carrossel/Grade de Depoimentos** com textos e vídeos curtos.

## Fluxos de UX

### 1. Inscrição de mentor/a

1. Usuário acessa CTA na home ou /mentores.
2. Preenche formulário com áreas de atuação, disponibilidade, bio, LinkedIn e aceite do termo de voluntariado.
3. CMS registra entrada na coleção **Mentores** com status “Em validação”.
4. Automação dispara e-mail de boas-vindas com link para calendário das quintas e para o roteiro.

### 2. Submissão de projeto (empreendedor/a)

1. Acesso via CTA “Quero apresentar meu projeto” (home, /projetos ou /encontros).
2. Formulário passo a passo com as cinco perguntas do roteiro.
3. CMS cria item em **Projetos** com status “Novo” e associa à pessoa empreendedora.
4. Automação agenda apresentação no próximo encontro disponível e envia instruções.

### 3. Agenda de encontros

1. Página `/encontros` exibe calendário com quintas, 16h–17h30, Google Meet.
2. Interessados selecionam data disponível e confirmam participação.
3. Admin atualiza pautas e vincula projetos atendidos na coleção **Encontros**.

### 4. Publicação de cases

1. Após acompanhamento (ex.: X semanas), time editorial marca projeto como “Publicável”.
2. Conteúdo é revisado, enriquecido com métricas e mídias.
3. Projeto é liberado em `/projetos/[slug]` com destaque no portfólio e blog.

## Taxonomias

- **Áreas de atuação**: educação, saúde, assistência social, ambiente, tecnologia, inclusão, economia circular etc. (conforme PDF original).
- **ODS**: multi-seleção com links para páginas oficiais da ONU, exibidos como chips coloridos.

## Padrões de Layout

- Cores: base no logo (preto/grafite, amarelo, verde) com fundos claros e espaços generosos.
- Tipografia: títulos em League Spartan (peso forte), textos corridos em Open Sans ou Montserrat.
- Cards com cantos levemente arredondados, sombras sutis e ícones minimalistas.
- Uso consistente de ícones para ODS e canais.

## Roadmap de Conteúdo Inicial

- **Home**: propósito & visão, métricas, destaques de 6 projetos (NASA Space Apps, OMSA, Water-is-Life, etc.), CTA para mentores/as e empreendedores/as.
- **Sobre**: linha do tempo 2019–2025, fotos da Baita/Unicamp, explicação do modelo colaborativo.
- **Projetos**: cadastro inicial de 12 cases com ODS e status atualizados.
- **Parcerias**: destaque para ITT, ANITEC, IPISA e outras redes.
- **Encontros**: calendário fixo das quintas com instruções de participação.
- **Roteiro**: página didática com as cinco perguntas e exemplos de respostas.
- **Metas**: quadro de OKRs 2025–2028 com metas públicas.
- **Blog**: quatro posts iniciais (relato de oficina do 3º setor, diário de projeto, boas práticas de governança em OSC, uso dos ODS na GMS).

## Stack Recomendada

### Opção A — Wix Studio

- Coleções de CMS conforme descrito, Repeaters com filtros por ODS/Área.
- Member Roles para backoffice leve.
- Formulários nativos com Velo para workflow de status e automações de e-mail.

### Opção B — Next.js + Supabase

- Schemas equivalentes às coleções acima.
- Autenticação para área de mentores/as e administração.
- Integração com Google Calendar para agendamento de encontros.
- Webhooks de formulários para disparar e-mails e atualizar status.

## Métricas e Indicadores

- Contadores automáticos (total de reuniões, participantes, projetos apoiados) alimentados pelo CMS.
- Metas públicas em `/metas` conectadas à coleção **MetasOKR**.
- Relatórios periódicos exportáveis para acompanhamento interno.

