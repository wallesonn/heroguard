# HeroGuard — Registro de avanço da landing page

**Status:** v0.2 em Next.js 16.4.0 — **em produção** desde 2026-10-19 e, com a stack renomeada, em `https://heroguard.my` desde 2026-10-23 (VPS, Docker, Traefik; domínio alterado de `heroguard.life`); imagem `wallesonnn/heroguard-app:v0.1.1`/`latest` no Docker Hub; commits passaram a ser feitos manualmente pelo usuário  
**Especificação-alvo:** [`landing-page.md`](landing-page.md)

Este documento registra os incrementos feitos para chegar à landing page descrita na especificação. Não substitui nem altera silenciosamente a especificação-alvo.

## Contexto verificado

- O repositório não tinha código de frontend; continha os documentos do produto e um `README.md` vazio.
- A branch de trabalho escolhida para esta etapa é `fix-feat`.

## Decisões para o incremento v0.1

- Usar HTML, CSS e JavaScript sem framework.
- Construir uma landing page responsiva, com direção visual premium/cinematográfica e transições e animações durante a rolagem.
- Reservar no hero o espaço para o vídeo, sem carregar um vídeo nesta versão.
- Manter a rolagem livre enquanto não houver vídeo real.
- Exibir botões e CTAs sem ações funcionais nesta versão.
- Usar conteúdo fictício nas demonstrações; não sugerir que IA, monitoramento ou integrações já funcionam.
- Preservar acessibilidade, legibilidade e desempenho; respeitar preferência por movimento reduzido.

## Fluxo de implementação e testes

1. Implementar na branch `fix-feat`.
2. Executar e verificar a versão em localhost antes do próximo commit.
3. Fazer commit somente depois do teste local aprovado.
4. Antes do merge, testar a revisão numa stack de teste da aplicação na VPS, confirmando que não é produção.
5. Com autorização do usuário e teste aprovado, fazer merge direto em `main`, sem PR; verificar o push.

## Acompanhamento

- [x] Ler a especificação-alvo e o conceito da plataforma.
- [x] Registrar o escopo v0.1 na especificação da landing page.
- [x] Implementar a landing page.
- [x] Testar em localhost e registrar resultado.
- [x] Implementar a simulação de abertura de 10 s no espaço do vídeo.
- [x] Testar a simulação em localhost e registrar resultado.
- [x] Fazer commit após o teste local — commits passaram a ser feitos manualmente pelo usuário (ver "Mudança de governança de commits").
- [x] Testar na VPS — a v0.2 foi direto para produção via Portainer (sem stack de teste intermediária); ver "Stack Docker e deploy em produção — 2026-10-19".
- [x] Deploy público verificado: `https://heroguard.life` com certificado válido.
- [x] Deploy da stack renomeada verificado: `https://heroguard.my` e `https://www.heroguard.my` com certificado válido (2026-10-23).

### Verificação local realizada

- Arquivos da implementação: `index.html`, `styles.css` e `script.js`.
- Servidor de verificação: `python -m http.server 8765 --bind 127.0.0.1 --directory C:/Users/Hermes/Documents/Walleson/Projetos/HeroGuard/heroguard-app`; `http://127.0.0.1:8765/` retornou HTTP 200.
- `node --check script.js` e parsing de `index.html` passaram.
- No navegador, desktop (1366 px) e celular (390 px) sem overflow horizontal.
- Verificados: espaço reservado sem elemento de vídeo; rolagem livre; CTAs desativados; destinos dos links internos existem; sem formulário nem referências a requisições externas nos arquivos da página.
- Rolagem progressiva revelou todos os 14 elementos animados. Com `prefers-reduced-motion: reduce`, nenhum conteúdo ficou oculto e o `scroll-behavior` foi `auto`.
- A porta 8000 reportada pelo especialista respondeu com conexão vazia; para o teste reproduzível foi usado o servidor acima na porta 8765.

### Verificação da simulação de abertura

Alteração implementada em `index.html`, `styles.css` e `script.js`: o espaço reservado no hero simula a reprodução com contador de 10 s e barra de progresso, sem arquivo de vídeo e sem requisições externas.

Resultados verificados no navegador:

- Ao abrir a página, a simulação inicia e a rolagem fica bloqueada (`overflow: hidden` na raiz, `is-scroll-locked`).
- Rolagem bloqueada confirmada: `ArrowDown` e `Space` foram cancelados e a posição não mudou; a tentativa de rolar não avançou.
- O botão **“ir para a pagina”** fica visível durante a contagem, recebe foco, tem contorno visível e libera a navegação ao ser acionado (mouse e teclado).
- Sem interação, a contagem libera sozinha aos 10 s.
- Depois da liberação, a simulação fica pausada no hero e a rolagem funciona normalmente.
- Abrir a página com âncora na URL não bloqueia a navegação.
- Clicar num link de navegação para fora do hero durante a contagem libera a página.
- Levar o foco do teclado para fora do hero libera a página, sem prender o foco.
- Sem overflow horizontal em desktop (1280 px) e celular (390 px).
- Com `prefers-reduced-motion: reduce`, a contagem avança em degraus de 1 s e nenhum conteúdo fica oculto.

Observações levantadas na verificação:

- Em viewports muito baixas, a página rola alguns pixels ao abrir para manter o contador e o botão visíveis; em desktop de altura normal a abertura fica no topo.
- O estado da simulação é gravado como `data-intro-sim` no elemento raiz, o mesmo nome usado como atributo do componente no HTML. Não causa erro hoje, mas convém renomear o estado para evitar ambiguidade em manutenção futura.

## Incremento v0.2 — migração para Next.js (registro)

Migração da landing page de HTML/CSS/JavaScript para Next.js com React, App Router e TypeScript, conforme a decisão registrada em `landing-page.md` (seção 3). Página estática primeiro: build com `output: 'export'` pré-renderiza `/` como conteúdo estático. Nenhum backend, API, rota dinâmica ou integração foi adicionado. Os arquivos estáticos anteriores (`index.html`, `script.js`, `styles.css`) foram preservados sem alteração; todo o conteúdo, copy e direção visual foram migrados sem reescrita.

Arquivos entregues (novos, sem commit):

- `package.json`, `tsconfig.json`, `next.config.mjs`, `.gitignore` — projeto Next.js 15.5.4, React 19.1.0, TypeScript.
- `app/layout.tsx` — metadata, `lang="pt-BR"`, importação dos estilos.
- `app/page.tsx` — todas as seções da página migradas do `index.html`.
- `app/globals.css` — cópia integral de `styles.css`.
- `app/intro.css` — estilos novos da camada de abertura e do botão "assistir novamente".
- `components/OpeningVideo.tsx` — componente de cliente da experiência de abertura.
- `components/PageEffects.tsx` — componente de cliente da barra de progresso e da revelação por rolagem.

Experiência de abertura implementada (simulação claramente identificada; não existe arquivo de vídeo — nada foi inventado, baixado ou substituído; nenhum teste de reprodução real de vídeo foi realizado ou alegado):

- Ao abrir a página, o espaço reservado fica em primeiro plano numa camada fixa (`intro-overlay`); a landing page fica visível atrás, escurecida e translúcida (fundo `rgba(3,7,13,0.72)` com `backdrop-filter: blur(9px)`), e a rolagem fica bloqueada (`is-scroll-locked`), sem prender foco ou leitores de tela.
- O botão `ir para a pagina` (texto preservado) encerra a abertura antecipadamente; a contagem encerra sozinha aos 10 s.
- Na página liberada, o espaço reservado fica no topo do hero, imediatamente antes do título, em pausa, com o botão `assistir novamente`.
- `assistir novamente` recomeça a abertura: camada em primeiro plano, página escurecida ao fundo, contagem reiniciada; ao final, a página é revelada novamente.
- Etiqueta `Simulação · sem vídeo` visível na camada durante a contagem.
- O componente está pronto para receber um ativo de vídeo local depois: a camada e os estados já separam reprodução de revelação.

### Verificação local da v0.2 (resultados reais de ferramentas)

Build: `npm run build` (Next.js 15.5.4) — `✓ Compiled successfully`, `✓ Generating static pages (4/4)`, `✓ Exporting (2/2)`; rota `/` marcada `○ (Static) prerendered as static content`. Verificado em servidor estático sobre `out/` (`http.server`), HTTP 200.

Resultados verificados no navegador (build de produção exportada):

- Estado de abertura: camada presente, `is-scroll-locked` ativo, foco inicial no botão `ir para a pagina`, contador `00:10`, página ao fundo escurecida e translúcida (fundo e blur confirmados via `getComputedStyle`).
- Fim automático aos 10 s: camada removida, rolagem liberada, espaço reservado em pausa (`Simulação pausada`, `00:10`) antes do título do hero, com `assistir novamente` presente e focado.
- `assistir novamente`: camada volta em primeiro plano, contagem reinicia em `00:10` com barra avançando, rolagem bloqueada novamente; revelação após o fim.
- Pular por mouse (clique) e por teclado (Enter no botão focado): ambos liberam a página, deixam o espaço reservado pausado com `assistir novamente` e movem o foco para o botão de replay.
- `ArrowDown` durante a abertura é cancelado e a posição não muda; após a liberação a rolagem funciona (posição muda com `scrollTo`).
- Espaço reservado antes do título: confirmado na ordem do DOM (`hero-screen` antes de `hero-copy`) e na geometria (`top` do espaço menor que o `top` do `h1`).
- Sem overflow horizontal em desktop (1366 px: `scrollWidth` 1351 ≤ `innerWidth` 1366) e celular (390 px: 390 ≤ 390).
- `prefers-reduced-motion: reduce` (emulado via CDP): contador avança em degraus de 1 s (`00:09`/`scaleX(0.1)` → `00:07`/`scaleX(0.3)`), sem animação contínua; após a liberação, todo o conteúdo fica acessível e as 14 seções `data-reveal` ficam visíveis ao percorrer a página.
- Abrir com âncora na URL (`/#visao`): página liberada de imediato, sem camada e sem bloqueio, espaço reservado pausado com `assistir novamente`.
- Barra de progresso de leitura ativa após a liberação (`scaleX` ≈ 0,96 perto do fim da página).

Correções feitas durante a verificação:

- Foco do botão `ir para a pagina` no replay e do `assistir novamente` após a revelação passou a esperar a montagem do React (os disparos imediatos ocorriam antes de o ref existir).
- `components/PageEffects.tsx`: o retorno antecipado do observador de revelação impedia a barra de progresso de ser registrada; os dois efeitos agora são independentes.

Observações:

- A camada de abertura usa `position: fixed`; o deslocamento de tela que a versão anterior fazia (`keepScreenInView`) deixou de ser necessário e foi removido.
- Estado da simulação não é mais gravado em `data-intro-sim` na raiz (a ambiguidade apontada na v0.1 foi eliminada; o atributo agora marca apenas o componente no hero).

## Atualização para Next.js 16.4.0 (registro)

Atualização da dependência `next` de 15.5.4 para a versão exata 16.4.0, solicitada pelo usuário. React e React DOM permanecem em 19.1.0 (aceitos pelo peer range `^19.0.0` do Next 16.4.0); nenhuma outra dependência foi atualizada. `output: 'export'`, App Router, TypeScript, conteúdo, layout e interações permanecem inalterados — nenhum recurso novo foi adicionado.

Arquivos alterados (sem commit):

- `package.json` — `"next": "15.5.4"` → `"next": "16.4.0"`.
- `package-lock.json` — regenerado de forma coerente (`next@16.4.0`, `react@19.1.0`, `lockfileVersion` 3).
- `tsconfig.json` — reescrito automaticamente pelo `next build` do Next 16: `jsx` mudou para `react-jsx` (React automatic runtime, mudança obrigatória do Next 16) e o `include` passou a incluir `.next/dev/types/**/*.ts`. Nenhuma outra alteração de configuração foi necessária.

Resultados reais de ferramentas:

- Ambiente: Node v26.7.0 (requisito do registro para `next@16.4.0`: `>=20.9.0`), npm 11.19.0.
- `npm install` concluiu sem erro; `npm ls` mostrou `next@16.4.0` com `react`/`react-dom@19.1.0` deduped.
- `npm ci` concluiu sem erro (exit 0), reinstalando a árvore a partir do lockfile.
- `npm run build` (Next.js 16.4.0, Turbopack) — `✓ Compiled successfully in 23.5s`, TypeScript concluído, `✓ Generating static pages using 3 workers (3/3)`; rotas `/` e `/_not-found` marcadas `○ (Static) prerendered as static content`.
- `out/index.html` presente em `out/`; servidor estático (`python -m http.server 8799 --bind 127.0.0.1 --directory out`) respondeu HTTP 200 em `http://127.0.0.1:8799/`.

Verificação no navegador (build de produção exportada, aba visível):

- Estado de abertura: camada presente, `is-scroll-locked` ativo, foco inicial em `ir para a pagina`, contagem `00:10`.
- Contagem decresce em tempo real (`00:10` → `00:01`) com a barra de progresso avançando continuamente (`scaleX` 0,02 → 0,97); liberação automática aos ~10 s (contador em `00:00` com desbloqueio; camada removida ~1 s depois, após o fade).
- Pular por clique (mouse) e por teclado (Enter real via CDP no botão focado): ambos liberam a página, deixam o espaço reservado pausado com `assistir novamente` e movem o foco para o botão de replay.
- `assistir novamente`: camada volta em primeiro plano com a etiqueta `Simulação · sem vídeo`, contagem reinicia (`00:10` → `00:09` → `00:08`), rolagem bloqueada; acionado também por Enter com o botão em foco.
- `ArrowDown` durante a abertura é cancelado (`defaultPrevented: true`) e a posição permanece 0.
- Espaço reservado antes do título: confirmado na ordem do DOM e na geometria (`hero-screen` em y=170 antes de `h1` em y=655).
- Depois da liberação: rolagem funciona (posição 7002 no fim da página via `scrollTo instant`), barra de progresso de leitura em `scaleX(1)` no fim da página.
- Viewport móvel (390 px emulado via CDP): `scrollWidth` 390 ≤ `innerWidth` 390, sem overflow horizontal durante a abertura e depois da liberação.
- `prefers-reduced-motion: reduce` (emulado via CDP): contagem avança em degraus de 1 s (`00:10`/`scaleX(0)` → `00:08`/`0.2` → `00:07`/`0.3` → `00:06`/`0.4` → `00:04`/`0.6`), `scroll-behavior` computado `auto` e as 14 seções `data-reveal` ficam visíveis ao chegar ao fim da página.
- Abrir com âncora na URL (`/#visao`): página liberada de imediato, sem camada e sem bloqueio, espaço reservado pausado com `assistir novamente`; a navegação para a seção ocorre normalmente.

Observação de método (não é defeito do código):

- Nas primeiras tentativas a contagem aparecia travada em `00:10` e a barra em `scaleX(0)`. A causa era o ambiente de teste, não a migração: a aba do navegador estava oculta (`document.hidden: true`), e o Chrome suspende `requestAnimationFrame` em abas ocultas (um rAF puro de sonda também não disparava). Com `Page.bringToFront` via CDP a aba fica visível e a contagem/barra funcionam como descrito acima. O fim automático aos 10 s, baseado em `setTimeout`, funcionava mesmo com a aba oculta.

## Proposta visual — imagem para a seção de presença

- Capivarte recomendou uma única imagem editorial fotorrealista de diálogo familiar para substituir a silhueta isolada. O usuário gostou da imagem e aprovou-a; ela foi incorporada à seção de presença no preview.
- Após autorização do usuário para gerar imagem estática via OpenRouter, Capivarte criou `assets/design-review/presenca-dialogo-familiar-01.png`.
- Verificação local: PNG válido, 1536 × 1024 px, 2.561.292 bytes. A imagem mostra personagens fictícios (adulto e adolescente) em ambiente doméstico, com o adolescente segurando um celular e a adulta ouvindo. Inspeção visual confirmou ausência de texto, logotipo ou interface legível.
- A imagem original permanece em `assets/design-review/`; uma cópia byte-idêntica foi colocada em `public/presenca-dialogo-familiar-01.png` para uso no Next.js. Não foi gerado vídeo.

## Direção visual — atualização aprovada pelo usuário

- A página não deve transmitir um clima sombrio ou de cybersegurança; a sensação desejada é família e proteção.
- A paleta deve ser mais aconchegante. O preview usa off-white/creme e areia, com acentos discretos verde-sálvia/teal. Os tons exatos continuam hipótese visual, sujeita a revisão do usuário.
- Manter cores GREEN/YELLOW/RED apenas para os níveis de classificação.
- A imagem aprovada está aplicada à seção de presença para comunicar diálogo familiar.

## Revisão visual acolhedora — preview local

- Arquivos visuais da aplicação: `app/warm-theme.css` (novo), `app/page.tsx`, `app/layout.tsx`, `app/intro.css`; o original `app/globals.css` foi preservado.
- Removidos do hero os anéis que pareciam radar/alvo; ocultados a linha de varredura e os pontos pulsantes; reduzidos efeitos neon. Cores GREEN/YELLOW/RED seguem reservadas às classificações.
- Build executado localmente: `npm run build` com Next.js 16.4.0 compilou com sucesso e pré-renderizou `/` e `/_not-found` como páginas estáticas.
- Prévia servida de `out/` em `http://127.0.0.1:8811/`, HTTP 200.
- No navegador: desktop 1280×900 e mobile 390×844 sem overflow horizontal; imagem carregou em ambos (1536×1024) com texto alternativo descritivo.
- Comportamento mantido e verificado: não há `<video>`; simulação abre em `00:10` e bloqueia rolagem; pular libera; sem interação libera após 10 s; simulação fica pausada e permite replay.
- Antes da iteração tipográfica, em desktop 1280×900 o título terminava em y=910 e o CTA em y=1060. A revisão subsequente compactou o hero: o título passou a y=508–716 e o CTA termina em y=875, dentro da primeira dobra.
- Nenhum commit, push, merge ou deploy; testes na stack da VPS continuam pendentes.

## Iteração tipográfica e de componentes — preview

- Tipografia proposta para avaliação: Fraunces nos títulos narrativos e DM Sans na interface/corpo, via `next/font/google` do Next. O build gerou 8 arquivos WOFF2 locais (236.048 bytes); verificado que o HTML não aponta para `fonts.googleapis.com` nem `fonts.gstatic.com`.
- Hierarquia: corpo 17–18px, textos da demonstração 16px e avisos ≥14px; headings com quebra balanceada e tracking menos comprimido.
- Componentes: cartões mais claros e arredondados; badges GREEN/YELLOW/RED com texto e fundo tonal; métricas decorativas reduzidas; setas de recursos estáticos e menu de conversa removidos; CTAs sem ação preservados como `disabled`, sem setas de link.
- Build reexecutado localmente pelo Sócio: `npm run build` com Next.js 16.4.0 concluiu com sucesso e rotas estáticas.
- Prévia atual: `http://127.0.0.1:8811/` (HTTP 200).
- Navegador desktop 1280×900: fontes carregadas, player pausado 880×320, título y=508–716 e CTA termina em y=875; sem overflow horizontal.
- Navegador mobile 390×844: sem overflow horizontal; CTA cabe na primeira dobra; cards de classificação em coluna e avisos legíveis.
- CTAs conferidos no DOM: 3 desabilitados, nenhum contém `↗`; `aria-describedby` hero/fechamento preservado. Não há elemento `<video>`.
- Simulação de 10 s e abertura/skip/replay mantidos; o build estático e a prévia seguem sem commit.

### Ajuste final de composição — notas do painel

- `app/globals.css`: notas “Contexto antes” e “Menos ruído” reposicionadas para não cobrir o painel nem o chip “Exemplo ilustrativo”; textos e DOM preservados.
- Build reexecutado localmente com Next.js 16.4.0: sucesso.
- Navegador em desktop 1280×900 e mobile 390×844: sem colisões entre notas, painel e chip; sem overflow horizontal.
- A prévia local continua em `http://127.0.0.1:8811/`; nenhum commit/push/merge feito.

### Integração da foto com fade nas bordas

- `app/warm-theme.css`: máscara CSS em dois eixos (`mask-image` e `-webkit-mask-image`) na imagem da seção de presença, com transparência suave nos quatro lados em direção ao fundo quente. Não foi usada vinheta escura; o elemento e a imagem existentes foram preservados.
- `npm run build` (Next.js 16.4.0) compilou com sucesso após parar o servidor que mantinha `out/` bloqueado.
- Preview `http://127.0.0.1:8811/` respondeu HTTP 200.
- Navegador em 1280×900 e 390×844: a imagem carregou, o fade está ativo, sem overflow horizontal.
- Nenhum arquivo de vídeo, commit, push, merge ou deploy.

## Propostas de arte — “Um mundo em movimento”

- **V1, supersedida:** `assets/design-review/mundo-em-movimento-infografico-01.png`, PNG 1448 × 1086 px, 2.025.026 bytes. A primeira tentativa enfatizou pessoas; o usuário esclareceu que esperava visualizar a movimentação do mundo no campo digital.
- **V2, base preferida:** `assets/design-review/mundo-em-movimento-infografico-02.png`, PNG 1448 × 1086 px, 1.341.557 bytes. Quatro agrupamentos de atividades digitais com balões, waveform e objetos de mídia/hobby.
- **V3, supersedida:** `assets/design-review/mundo-em-movimento-infografico-03.png`, PNG 1600 × 1200 px, 1.628.970 bytes. Foi gerada a partir de texto com o modelo `openai/gpt-image-2.5-sunburst`, não editada sobre V2; por isso alterou desenhos existentes.
- **V4, edição image-to-image da V2:** `assets/design-review/mundo-em-movimento-infografico-04.png`, PNG 1448 × 1086 px, 1.379.864 bytes. Usou `openai/gpt-image-2.5-sunburst` via OpenRouter e preservou os clusters, adicionando conexões, textos e carinhas; o logo central ficou pequeno e permaneceu uma marca duplicada no canto.
- **V5, aprovada pelo usuário:** `assets/design-review/mundo-em-movimento-infografico-05.png`, PNG 1448 × 1086 px, 1.384.998 bytes. Edição determinística da V4: o símbolo oficial SVG foi ampliado para 220 px no centro, com wordmark `HeroGuard` abaixo; a marca duplicada inferior direita foi removida. Inspecionada visualmente pelo Sócio.
- Na V5, quatro clusters, balões, seis mensagens em português, oito avatares e curvas de ligação foram preservados. A arte mantém creme/areia, sage/teal e acentos terrosos; não contém pessoas como foco, vigilância ou marcas de apps.
- V1–V5 permanecem em `assets/design-review/`; a V5 aprovada está integrada à seção `vida-digital`, com cópia byte-idêntica em `public/`. Proporção 4:3 preservada, sem crop. Nenhum commit feito.
- Custos informados pelo Capivarte: V3 US$ 0,022435; V4 US$ 0,059601. V5 foi composição determinística, sem nova geração de imagem. Nenhum vídeo foi gerado.

## Integração da V5 na seção “Um mundo em movimento”

- `app/page.tsx`: ilustração orbital antiga substituída pela arte V5; os textos aprovados, rodapé e `data-reveal` permanecem.
- `public/mundo-em-movimento-infografico-05.png` é cópia byte-idêntica do original `assets/design-review/mundo-em-movimento-infografico-05.png` (1.384.998 bytes).
- A imagem usa proporção 4:3, `object-fit: contain` e não é cortada.
- Build Next.js 16.4.0 verificado com sucesso; preview `http://127.0.0.1:8811/` e asset responderam HTTP 200.
- DOM no browser: arte carregada em 1448×1086, renderizada 561×421 no desktop 1280×900 e 344×258 no mobile 390×844; sem overflow horizontal nem vestígios da antiga cena orbital.
- Nenhum vídeo, commit, push, merge ou deploy. Stack de teste da VPS ainda não usada.

## Correção da prévia no Safari — 2026-10-14

- Ao abrir a prévia pelo host `127.0.0.1`, o servidor de desenvolvimento Next.js bloqueava solicitações cross-origin para recursos e endpoints de desenvolvimento, incluindo o HMR.
- `next.config.mjs`: adicionado `allowedDevOrigins: ['127.0.0.1']` para permitir o host local usado pela prévia. O servidor reiniciou com a configuração atualizada.
- Verificação local: `http://localhost:3000/` respondeu HTTP 200; a resposta inicial continha a contagem de 10 segundos e o botão para pular a abertura.
- O usuário confirmou que, após atualizar a página no Safari, a simulação de abertura funcionou. Continua sendo uma simulação visual, sem arquivo de vídeo real.

## Ajuste das cores do wordmark — 2026-10-14

- `app/warm-theme.css`: token `--brand: #276c63` separado de `--accent`; regra reutilizável `.brand-wordmark` criada.
- `app/page.tsx`: o token de marca foi aplicado às cinco ocorrências visíveis do nome (header, footer, título conceitual, mockup e menção inline), sem alterar a copy ou outros elementos.
- Build Next.js 16.4.0 reexecutado localmente pelo Sócio: sucesso; rotas estáticas geradas.
- Browser em 1280×900 e 390×844: 5/5 wordmarks em `rgb(39, 108, 99)`; sem overflow. Contraste calculado entre 5,23:1 e 6,06:1, acima do mínimo WCAG AA para texto normal.
- `--accent`, cores de navegação, botão primário e níveis GREEN/YELLOW/RED permaneceram inalterados.
- A prévia temporária foi encerrada após os testes. Nenhum commit, push, merge ou deploy.

## Infográfico vetorial e loop motion — integração — 2026-10-15

- O usuário aceitou a aproximação vetorial da V5 e autorizou a animação em loop, com elementos revelados em sequência e logo HeroGuard por último. A V5 PNG original continua preservada como referência/backup.
- Capivarte entregou um mestre SVG puro (`assets/design-review/mundo-em-movimento-vetor-master-01.svg`, 4:3, viewBox 1448×1086) com 138 grupos e 151 IDs únicos. `public/mundo-em-movimento-vetor-master-01.svg` é a fonte usada pelo app e pelo gerador; XML válido, sem raster embutido. A pasta `assets/design-review/` permanece ignorada pelo `.gitignore`.
- `components/MundoEmMovimento.tsx` contém o SVG inline, com 138 grupos e IDs animáveis; descrição acessível curta, sem metadata de revisão no DOM. `scripts/generate-mundo-em-movimento.mjs` lê o mestre público e regenera componente/CSS sem alterar os hashes dos dois arquivos de saída.
- `app/page.tsx` substituiu apenas o `<img>` da seção `vida-digital` pelo componente SVG; textos, footnote e animações de revelação da seção foram mantidos. Nenhuma PNG/JPG é carregada pela seção do infográfico; a foto PNG da seção de presença permanece inalterada.
- `app/mundo-em-movimento.css`: loop CSS de 12,8 s, grupos revelados em sequência, quatro conectores desenhados, logo/wordmark em `#276C63` por último, pausa narrativa e reinício; movimento reduzido mostra a composição estática completa, e o loop pausa fora da viewport. Sem vídeo ou créditos de geração de imagem.
- Browser QA na saída estática: ciclo observado até logo final e reinício; offscreen pausa; `prefers-reduced-motion` resultou em zero animações e todos os grupos visíveis. Em desktop (1280×900) e mobile (390×844), proporção 4:3 sem overflow; `#vida-digital` sem elementos `<img>` nem solicitação da PNG V5; wordmark `rgb(39,108,99)`.
- O usuário confirmou que a animação funcionou na página; nenhum ajuste visual adicional foi solicitado.
- Build do código numa cópia local temporária: `npm ci` concluiu; `npm run build` (Next.js 16.4.0/Turbopack) compilou em 8,4 s, TypeScript em 8,2 s e gerou 3/3 páginas estáticas. No caminho original UNC (`W:`), o Turbopack falhou ao enumerar `node_modules` com “Assinatura inválida”; PowerShell e Node leem os arquivos, mas o build padrão em UNC continua com essa limitação ambiental. Tentativa alternativa `--webpack` no UNC excedeu o limite de tempo.
- A cópia local de QA e o servidor da porta 4173 foram removidos/encerrados após os testes. Sem commit, push, merge ou deploy.
- Limitação visual aceita: o SVG é uma reconstrução vetorial próxima, mas não pixel-idêntica à V5; textura, sombras, microcontornos e fonte diferem (Segoe UI/Arial local no SVG).
## Stack Docker e deploy em produção — 2026-10-19

A landing v0.2 foi empacotada em imagem Docker e publicada na VPS, saindo de
"preview local" para produção em `https://heroguard.life`.

### Artefatos criados

- **`heroguard-docker/`** (repo próprio aninhado, remote
  `github.com/wallesonn/heroguard-docker`, mesmo padrão do
  `inlaudo-web/inlaudo-docker`):
  - `Dockerfile` multi-stage: `node:22-alpine` (`npm ci` + `next build`) →
    `nginx:1.27-alpine` servindo o export estático `out/` (~28 MB).
  - `nginx.conf` — gzip, cache de assets/imagens.
  - `docker-compose.yml` — serviço `app` (imagem do Docker Hub, labels
    Traefik) + serviço `db` (Postgres 17-alpine, volume `pgdata`, healthcheck)
    provisionado para o backend futuro; a landing estática ainda não o usa.
  - No GitHub, o repo versiona **apenas** `README.md` e `docker-compose.yml`
    (pedido do usuário); Dockerfile/nginx.conf/.env.example ficam só no disco.
- **`build.sh`** (raiz do app): `./build.sh vX.Y.Z` — `docker buildx`,
  `linux/amd64`, tags versão + `latest`, `--push` para
  `wallesonnn/heroguard-app`. O contexto é a raiz do repo, então
  `public/videos/` entra na imagem quando o vídeo existir.
- **`.dockerignore`** na raiz — contexto enxuto sem excluir `public/videos/`.

### Configuração alinhada à infra real da VPS

Espelhada do compose do inlaudo: rede externa `web`, entrypoint `websecure`,
certresolver `lets-encrypt`, `Host(\`heroguard.life\`)`, porta interna 80,
imagem parametrizada por `DOCKER_IMAGE`.

### Deploy (Portainer, método Repository)

Deploy manual pelo Portainer apontando para o repo público
`wallesonn/heroguard-docker`. Problemas encontrados e resolvidos:

1. **`build:` quebrava o deploy** — o Portainer clona só o repo de deploy
   (sem código-fonte) e falhava em `lstat .../heroguard-docker`. Removido o
   bloco `build:`; o compose só puxa a imagem pronta do Docker Hub.
2. **Let's Encrypt falhou → rate limit** — o DNS de `heroguard.life` era novo
   demais (`no valid A records found`); após 5 validações falhas, o LE
   aplicou limite de 1h. O Traefik retentou sozinho quando o limite expirou
   (~22:11 UTC) e o certificado foi emitido. Lição: DNS propagado antes do
   deploy.
3. **Conflito na porta 5432** — a VPS já tem outro Postgres no host. O bloco
   `ports:` do `db` foi desabilitado (comentado) no compose; o banco fica só
   na rede interna da stack (`db:5432`), suficiente para o backend futuro.
4. **`traefik.enable=false` no `db`** — o Traefik usa `exposedByDefault` e
   logava `unable to find the IP address` tentando rotear o Postgres.

### Resultado verificado

- `https://heroguard.life` → HTTP 200 (223 KB) com certificado Let's Encrypt
  válido; redirect HTTP→HTTPS ativo; tráfego real já observado nos logs.
- Imagem em produção: `wallesonnn/heroguard-app` (`v0.1.1` / `latest`).
- Fluxo de atualização: `./build.sh vX.Y.Z` → **Pull and redeploy** na stack
  (ou `DOCKER_IMAGE` travada + **Update the stack**).

### Mudança de governança de commits

A partir desta etapa, **o usuário faz commits e pushes manualmente** nos dois
repos (app e `heroguard-docker`). Agentes preparam alterações, mas não
commitam nem publicam — regra registrada em `AGENTS.md`.

## Renomeação da marca para HeroGuard — 2026-10-23

O produto passou a se chamar **HeroGuard**. Foram atualizadas apenas as
referências de texto da aplicação e da documentação; os identificadores
técnicos publicados permanecem com o nome antigo.

Alterado:

- `app/page.tsx` — wordmark dividido (`brand-hero` + `brand-guard`), textos
  "HeroGuard" (header, conceito, mockup, seção de sinais, rodapé) e letra do
  mock (`H`).
- `app/layout.tsx` — `title` e `description`.
- `app/privacidade/page.tsx` — nome do produto, responsável e textos do aviso.
- `components/Waitlist.tsx` — `alt` da logo no modal.
- `app/warm-theme.css` — token `--brand-chat` → `--brand-hero` e classe
  `.brand-chat` → `.brand-hero` (cores mantidas: `#006bc1` e `#006d99`).
- `public/mundo-em-movimento-vetor-master-01.svg` — títulos/descrição e
  wordmark do infográfico; `components/MundoEmMovimento.tsx` e
  `app/mundo-em-movimento.css` regenerados pelo script (nunca editados à mão).
  "HeroGuard" tem o mesmo número de caracteres de "HeroGuard", então o
  `textLength="90"` do `<tspan>` continua válido.
- `package.json` / `package-lock.json` — nome do pacote
  `heroguard-landing`.
- `index.html` (versão estática legada v0.1) — textos e wordmark.
- Documentação: `README.md`, `AGENTS.md`, `docs/landing-page.md`,
  `docs/platform-concept.md`, este arquivo e `heroguard-docker/README.md`.

Renomeação de infraestrutura — concluída no código em 2026-10-23:

- Domínio das regras do Traefik: `chatguard.life` → `heroguard.life`
  (incluindo `www.heroguard.life`); em 2026-10-23 passou para
  `heroguard.my` — ver "Mudança de domínio para heroguard.my".
- Imagem Docker: `wallesonnn/chatguard-app` → `wallesonnn/heroguard-app`
  (repositório novo criado pelo usuário no Docker Hub) em `build.sh`,
  `docker-compose.yml` e `.env.example`.
- Containers: `chatguard-app`/`chatguard-db` → `heroguard-app`/`heroguard-db`.
- Traefik: routers/services `chatguard` → `heroguard`; labels
  `app=heroguard`, `domain=heroguard.life`, `service=heroguard-app`.
- Postgres: usuário/banco padrão `heroguard` (volume `pgdata` mantido).
- Pastas e caminhos: `chatguard-docker/` → `heroguard-docker/` (repo aninhado
  com o mesmo `.git`), referência no `.gitignore` do app e `-f
  heroguard-docker/Dockerfile` no `build.sh`. O diretório raiz do app também
  foi renomeado para `heroguard-app/`.
- `docs/landing-page.md`, `README.md`, `AGENTS.md`,
  `heroguard-docker/README.md` e este arquivo atualizados.

Logos — atualizado em 2026-10-23:

- Todas as imagens de marca passaram a usar `public/heroguard-logo-alpha.png`
  (924 × 939, fundo transparente, símbolo escudo + balão em azul/lilás):
  header e rodapé de `app/page.tsx` e logo do modal em
  `components/Waitlist.tsx`.
- O arquivo original foi entregue como `heroguard-logo- alpha.png` (com espaço
  no nome); uma cópia foi criada com o nome correto. O arquivo com espaço e os
  antigos `chatguard-sologo.png`/`chatguard-logo.png` permanecem no disco, sem
  uso.
- As cores da landing page foram mantidas (tema quente, `--brand-hero`
  `#006bc1` e `--brand-guard` `#006d99`); a paleta de `docs/visual-identity`
  não foi aplicada.

Estado da migração:

- Concluído em 2026-10-23: imagem `wallesonnn/heroguard-app` publicada e stack
  no ar (ver "Deploy da stack heroguard.my — 2026-10-23"); repositórios GitHub
  renomeados pelo usuário — app em `wallesonn/heroguard` e deploy em
  `wallesonn/heroguard-docker`. Os remotes locais também passaram para as URLs
  novas, e a stack no Portainer (*Repository*) aponta para
  `https://github.com/wallesonn/heroguard-docker`.
- Deferido: a identidade visual de `docs/visual-identity` (paleta azul/lilás,
  Manrope/Inter) fica documentada como referência para a aplicação de produto,
  a ser implementada depois. A landing page continua com o tema atual
  (`--brand-hero` `#006bc1`, `--brand-guard` `#006d99`) por decisão do usuário.

## Mudança de domínio para heroguard.my — 2026-10-23

Decisão do usuário: o domínio público passa de `heroguard.life` para
**`heroguard.my`** (incluindo `www.heroguard.my`). A marca e os demais
identificadores técnicos (imagem, containers, routers/services, labels
`app`/`service`, usuário/banco) permanecem inalterados.

Alterado:

- `heroguard-docker/docker-compose.yml` — label `domain=heroguard.my` e regra
  do Traefik `Host(\`heroguard.my\`) || Host(\`www.heroguard.my\`)`.
- `AGENTS.md`, `README.md`, `docs/landing-page.md`,
  `heroguard-docker/README.md` e este arquivo — identificadores atuais e
  instruções de deploy com o novo domínio. As seções históricas do deploy de
  2026-10-19 mantêm `heroguard.life`, que era o domínio em uso na data.

Para entrar no ar:

1. Apontar o DNS de `heroguard.my` e `www.heroguard.my` para o IP da VPS e
   confirmar a propagação (`dig +short heroguard.my`).
2. Publicar o repo `wallesonn/heroguard-docker` (o compose mudou) e fazer
   **Update the stack** no Portainer — o Traefik passa a rotear o novo host e
   emite o certificado Let's Encrypt. Sem o DNS propagado, o LE aplica rate
   limit após 5 falhas.
3. Opcional: manter `heroguard.life` na regra do Traefik durante a transição
   (basta acrescentar `|| Host(\`heroguard.life\`) || Host(\`www.heroguard.life\`)`).

> Os três passos foram executados em 2026-10-23 — ver a seção seguinte.

## Deploy da stack heroguard.my — 2026-10-23

Deploy concluído e verificado:

- DNS: `heroguard.my` e `www.heroguard.my` resolvem para `31.97.163.110`.
- HTTPS: `https://heroguard.my` e `https://www.heroguard.my` respondem
  HTTP 200 servindo o export do Next.js.
- Certificado Let's Encrypt emitido em 2026-10-23 18:01 UTC, válido até
  2027-01-21, com SAN para `heroguard.my` e `www.heroguard.my`.
- A stack anterior (`chatguard.life`) deixa de ser a versão publicada; o
  domínio antigo não está mais na regra do Traefik.

## Navegação e enxugamento de conteúdo — 2026-10-23

Análise da landing page e ajustes aplicados:

- **Header fixo:** `.site-header` passou de `absolute` para `fixed`, com
  `scroll-padding-top` de 100px no desktop e 84px no mobile (altura do header
  + folga), então as âncoras deixam de parar sob o menu.
- **Menu navegável:** novo `components/SiteNav.tsx` (client) com cinco
  destinos — `#visao`, `#conceito`, `#sinais`, `#demonstracao`,
  `#privacidade`. Abaixo de 1000px vira botão *Menu* com painel suspenso
  (fecha ao escolher link, com Escape — devolvendo o foco ao botão — ou ao
  voltar à largura de desktop). Abaixo de 520px o botão fica só com o ícone;
  abaixo de 380px o CTA do header é ocultado.
- **Âncoras novas:** `id="sinais"` na seção 05 e `id="privacidade"` na seção
  de privacidade (antes só existiam `inicio`, `vida-digital`, `visao`,
  `conceito`, `demonstracao` e `mensagem-final`).
- **Seções 05 e 06 fundidas:** “Sinais, não sentenças” absorveu “O que
  importa”; os quatro pilares viraram uma lista compacta em duas colunas
  abaixo dos cartões GREEN/YELLOW/RED, com um único aviso. A demonstração
  passou de 07 para 06.
- **Resumo editorial encurtado:** saiu a menção a “rapto” e à investigação em
  curso, e os dois links externos foram removidos (as páginas de origem
  expõem dados da menor). A atribuição ficou em texto simples: “Fontes: UOL
  (14 de outubro de 2026) e O Globo (13 de outubro de 2026)”.
- **Arte do interlúdio editorial removida:** os três cartões abstratos do SVG
  (`InterludioEditorial`, com as linhas tracejadas) não carregavam informação
  e liam como retângulos vazios. O componente foi excluído; a seção ficou só
  com texto e as fontes. `editorial-motion.css` manteve apenas estilos
  tipográficos do bloco, `.editorial-section` e `.editorial-sources`; o bloco
  de privacidade não mudou.
- **Ressalvas reduzidas:** removidos “Dados fictícios” (duas vezes),
  “• exemplo fictício” e “Mensagem ilustrativa · contexto importa” (duas
  vezes) do mock da 04; removidos “Contato ilustrativo · sem conexão” e
  “EXEMPLO DE CONVERSA FICTÍCIA” da demonstração. Cada bloco mantém ao menos
  dois rótulos de simulação (badge + rodapé).
- **Repetição:** o eyebrow da seção 02 passou de “Menos ruído. Mais
  contexto.” para “02 — O problema” (a assinatura fica no fecho e no rodapé),
  e o CTA do header passou de “Conheça a proposta” para “Entrar na lista”,
  que é o que ele faz (abre o modal).
- **Manchete da notícia:** o rótulo virou “Uma notícia, com contexto”; o
  resumo e os três passos foram substituídos por uma única frase curta em
  tipografia grande. Abaixo, a atribuição detalha veículo, tema e data para
  UOL e O Globo, sem links ou títulos originais que possam expor a menor.
- **Referência da notícia mais explícita:** a linha abaixo da manchete agora
  se identifica como “Fontes dos fatos” e associa cada veículo/data ao dado
  relatado por ele; o texto ganhou maior legibilidade sem adicionar links.

Verificação: `tsc --noEmit` e `npm run build` passaram; export em `out/`
confirma `id="sinais"`, `id="privacidade"`, `primary-nav` e ausência de
`pillars-section`/`chat-date`. Nenhum commit feito.

## Atualização de segurança do Next.js — 2026-10-23

`next` passou de `16.4.0` para **`16.4.3`** (versão travada, sem `^`). A faixa
`>=16.0.0 <=16.4.0` era afetada por três advisories:

- `GHSA-2464-fhr4-w9xw` (crítica) — RCE não autenticado na Image Optimization
  API com SVG;
- `GHSA-673q-mjm6-r5xr` (crítica) — RCE não autenticado em `use cache` com
  typed arrays;
- `GHSA-p3m5-59mp-jv5r` (alta) — DoS no App Router com Server Actions.

Exposição real no projeto era baixa (export estático não usa Server Actions,
Image Optimization nem `use cache`), mas o `next dev` roda Node e o build
passou a interromper com aviso de segurança. Depois da atualização:
`npm audit` = 0 vulnerabilidades, `tsc --noEmit` e `npm run build` limpos, e
o build não emite mais o aviso.

## Carrossel interativo das telas do beta — 2026-10-23

Na seção “Como funciona”, as cinco telas `public/HeroGuard_tela01.png` a
`public/HeroGuard_tela05.png` são apresentadas em carrossel, substituindo o
mock de painel em HTML. A tela ativa fica centralizada; as telas anterior e
próxima aparecem menores, translúcidas e em segundo plano, com transições
suaves e zoom.

- Avanço automático em loop enquanto o carrossel está visível; pausa quando
  sai da viewport.
- Navegação por swipe/arraste horizontal, setas na tela, indicadores e teclas
  de seta; ~~controles para pausar e retomar~~ (controle de play/pausa
  removido em 2026-10-23 a pedido do usuário; o loop automático e a navegação
  manual seguem sem interromper um ao outro).
- `prefers-reduced-motion` desativa a reprodução automática e as transições,
  mantendo a navegação manual.
- Sem fundo ou cenário decorativo atrás das imagens; mantém as bordas mais
  arredondadas nas telas 3 e 4.

Verificação: `tsc --noEmit` e `npm run build` passaram; a rota e as cinco
imagens respondem HTTP 200. Nenhum commit feito.

## Motions aprovados: chat “Veja na prática” e infográfico de privacidade — 2026-10-26

Dois motion graphics aprovados pelo usuário nesta data:

- **“Veja na prática” (`components/VejaNaPraticaMotion.tsx`):** conversa
  animada em janela escura, controlada por estado React (fases 0–9) em vez de
  keyframes sincronizados — a primeira versão em CSS puro desalinhava na
  segunda repetição do loop. Sequência: indicadores de digitação com três
  pontos pulsando antes de cada balão; mensagens curtas em ordem; banner
  AMARELO entrando **apenas no final** com glow pulsante; nota de contexto;
  pausa de leitura e fade para reiniciar. Roda em loop só com a seção na
  viewport e, com `prefers-reduced-motion`, exibe a conversa completa
  estática.
- **“Privacidade e segurança” (`components/PrivacidadeMotion.tsx`):**
  infográfico animado em fundo 100% transparente, sem textos — escudo com
  cadeado no centro, três órbitas girando em direções alternadas, pulsos de
  radar e três nós (chave, radar, cofre) ligados por feixes. Substituiu o
  `NotaPrivacidade` (cartões tracejados one-shot), que deixou de ser usado.
  Todas as transformações usam `transform-origin` centralizado no grupo
  `translate(340, 170)` — a primeira versão posicionava os nós “fora do
  lugar” por misturar coordenadas absolutas com origens de animação em CSS.

Verificação: `tsc --noEmit` e `npm run build` passaram; ambos validados
visualmente pelo usuário no preview local.

## Cadastro real da lista de espera — API + Postgres — 2026-10-28

O formulário da lista de espera passou a persistir de verdade. Fluxo:
`navegador → Traefik → nginx (/api/) → api → Postgres (tabela waitlist)`.

**Novo serviço `api/` no repo do app** (versionado junto com o código):

- `api/server.js` — `node:http` + `pg` (8.23.1, sem framework). Rotas:
  `POST /api/waitlist` e `GET /api/health`.
- Validação server-side (nome ≥ 2, e-mail, telefone 10–11 dígitos,
  consentimento obrigatório) espelhando a validação do modal.
- Upsert por e-mail (`ON CONFLICT (email) DO UPDATE`): reenvio atualiza
  nome/telefone/`updated_at` e **preserva o `status`** — o fluxo de contato
  não repete o mesmo lead.
- Rate limit em memória: 5 envios válidos por IP a cada 10 min; erros de
  validação não contam. O IP é lido da **última** entrada do
  `X-Forwarded-For` (a primeira entrada é controlável pelo cliente — a
  versão inicial lia a primeira e permitia burlar o limite; o nginx passou a
  repassar o cabeçalho do Traefik sem anexar).
- Schema criado pela própria API na inicialização (idempotente, com retry
  de 30 tentativas): tabela `waitlist` (id, name, email único, phone, status
  default `novo`, source, consent_at, consent_version, ip, user_agent,
  created_at, updated_at) + índice `(status, created_at DESC)`.
- `api/Dockerfile` — node:22-alpine, sem root, healthcheck em `/api/health`.
  Imagem: `wallesonnn/heroguard-api`.

**Frontend:** `components/Waitlist.tsx` faz `fetch` real para
`/api/waitlist` (ou `NEXT_PUBLIC_WAITLIST_ENDPOINT` em dev, onde não existe
o proxy do nginx), com estado “Enviando...”, timeout de 15 s e mensagens de
erro vindas da API. A confirmação só aparece após 201.

**Stack (`heroguard-docker/docker-compose.yml`):**

- Novo serviço `api` (container `heroguard-api`), só na rede `default`,
  `traefik.enable=false`, `depends_on: db healthy`. A `DATABASE_URL`
  inútil do serviço `app` foi removida.
- `nginx.conf`: proxy de `/api/` para `api:3000` com `resolver 127.0.0.11`
  + variável no `proxy_pass` — sem isso o nginx morre no startup
  (“host not found in upstream”) se o container da API ainda não existir.
  `client_max_body_size 16k`.
- `db` também na rede `web` com alias `heroguard-db`: permite que o n8n
  (mesma VPS, mesma rede) consulte a tabela sem expor porta.
- `.env.example`: nova variável `API_IMAGE`.

**Correções de build/deploy nesta mesma entrega:**

- `heroguard-docker/.dockerignore` renomeado para
  `Dockerfile.dockerignore` — com o build `-f heroguard-docker/Dockerfile .`,
  só esse nome (ou `.dockerignore` na raiz do contexto) é aplicado; antes,
  `node_modules`, `.next` e `out` entravam no contexto da imagem do site.
  Agora também exclui `api/`.
- `build.sh` publica as duas imagens (`heroguard-app` e `heroguard-api`).

**Deploy v0.1.6 (2026-10-28):** produção (`heroguard.my`) e stack de teste
(`teste.heroguard.my`) reimplantadas com os três serviços. Validado:
`/api/health` 200 nos dois ambientes; POST de teste gravado e conferido na
tabela (upsert devolvendo o mesmo id); rate limit e validações verificados
nos testes locais de containers.

**Lições deste deploy (ver `heroguard-docker/README.md`):**

- `POSTGRES_USER`/`POSTGRES_PASSWORD` só valem na **primeira** criação do
  volume. A API ficou em loop `28P01` até a senha do banco ser alinhada à do
  stack (`ALTER USER`), e a stack de teste tinha um volume antigo com outro
  role (recriado com `docker volume rm`).
- `psql` local dentro do container funciona sem senha (`local all all
  trust`); conexões TCP exigem as credenciais do env.

**LGPD:** a página `/privacidade` foi reescrita — não afirma mais que “os
dados não são enviados nem armazenados”; agora descreve o armazenamento no
Postgres da VPS, o registro de IP/user-agent (retenção de 6 meses) e a
transferência futura para a Uazapi quando o envio ativar. Versão do aviso:
`2026-10-28-v2`.

## Pendências

- Fluxo n8n de contato: consultar `waitlist` (`status = 'novo'`), enviar
  próximos passos pelo WhatsApp e marcar `status = 'contatado'`. Ainda a
  construir. Host do banco para o n8n: `heroguard-db` (rede `web`).
- Melhorias sugeridas na API (não críticas): retentativa com backoff em vez
  de exit após 30 tentativas, com mensagem específica para `28P01`; rota de
  leitura autenticada (`GET /api/waitlist` + token) para o n8n consumir por
  HTTP em vez de conexão direta ao banco; log de envios com o `id`
  (sem dados pessoais); backup periódico do volume `pgdata`.
- `www.heroguard.my` adicionado à regra do Traefik
  (`Host(\`heroguard.my\`) || Host(\`www.heroguard.my\`)`) — em vigor desde o
  **Update the stack** de 2026-10-23, com certificado reemitido com SAN para
  os dois hosts.
- Rebuild/redeploy pendente: a versão `v0.1.7` deve incluir o aviso de
  privacidade atualizado (`2026-10-28-v2`), gerado depois do deploy v0.1.6.
- Commits e pushes: feitos manualmente pelo usuário.
