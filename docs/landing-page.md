# HeroGuard — Documentação Inicial da Landing Page

**Versão:** 0.2  
**Status:** Especificação implementada — v0.2 em produção em `heroguard.my` (deploy 2026-10-19; ver `implementation-progress.md`)  
**Tipo:** Landing page institucional / lista de espera

## 1. Visão geral

A landing page do HeroGuard será uma experiência institucional, cinematográfica e emocional para apresentar a proposta do produto a pais, mães e responsáveis por crianças e adolescentes.

Nesta primeira versão, a página terá exclusivamente objetivos de apresentação e conversão para uma futura lista de espera. A aplicação ainda não terá funcionalidades de produto implementadas.

> **Atualização (2026-10-28):** o **cadastro da lista de espera está ativo e
> persistindo dados** — o formulário envia para uma API (`POST /api/waitlist`)
> que grava na tabela `waitlist` do Postgres da própria stack. As demais
> funcionalidades de produto (monitoramento, classificação, integrações)
> permanecem conceituais e todas as demonstrações seguem fictícias.

### 1.1 Finalidade da plataforma

O HeroGuard é uma plataforma de inteligência e proteção digital criada para ajudar pais e responsáveis a compreender melhor o ambiente digital em que seus filhos estão inseridos.

A plataforma deverá ajudar os responsáveis a identificar quais conversas e situações podem merecer atenção, sem exigir o acompanhamento manual de todas as interações digitais dos filhos.

O objetivo final é aproximar pais e filhos no mundo digital, oferecendo melhores informações para que os responsáveis possam agir quando necessário.

### 1.2 Problema que a plataforma pretende resolver

Crianças e adolescentes mantêm diariamente dezenas ou centenas de interações por aplicativos de mensagens e redes sociais. Para os responsáveis, acompanhar todo esse volume de informação é praticamente impossível.

O HeroGuard pretende reduzir essa sobrecarga ao transformar grandes volumes de conversas em informações mais simples, organizadas e compreensíveis, destacando aquilo que pode exigir maior atenção.

### 1.3 Acompanhamento parental transparente

O HeroGuard parte da proposta de que pais e responsáveis podem acessar as conversas de filhos crianças e adolescentes para protegê-los. O responsável deve informar o filho sobre o uso do HeroGuard e sobre esse acompanhamento, cujo objetivo é a proteção e o diálogo familiar.

Esse acompanhamento não deve ser oculto. A comunicação deve transmitir proteção, proximidade e responsabilidade, sem recorrer ao medo, à paranoia ou a afirmações de perigo sem contexto. Uma classificação ou conversa sinalizada não é, por si só, prova de perigo ou comportamento inadequado.

### 1.4 Inteligência, contexto e classificação

Na visão futura da plataforma, a inteligência artificial poderá analisar as interações disponíveis e identificar padrões ou elementos que mereçam diferentes níveis de atenção.

As conversas poderão ser organizadas em três níveis visuais:

- **Verde:** nenhuma atenção especial identificada naquele momento;
- **Amarelo:** existem elementos que podem merecer atenção do responsável;
- **Vermelho:** existem elementos que justificam atenção prioritária.

As classificações representam sinais identificados pela inteligência artificial. Elas não devem ser interpretadas como prova de que existe um problema, perigo ou comportamento inadequado.

O HeroGuard deve incentivar o responsável a compreender o contexto antes de tirar conclusões sobre uma conversa, pessoa ou situação.

### 1.5 Experiência e organização das informações

O painel futuro deverá apresentar as interações de forma simples e visual, utilizando minicards de contatos e conversas. As interações mais recentes poderão receber prioridade e ter seu nível de atenção destacado visualmente.

A experiência deve ajudar o responsável a reduzir o ruído e focar no que importa, sem transformar a plataforma em um fluxo de informações difícil de processar.

### 1.6 Filosofia da plataforma

O conceito central do HeroGuard pode ser resumido por:

> **Você não precisa olhar tudo. Precisa saber o que merece sua atenção.**

Os princípios de longo prazo da plataforma são:

- Inteligência;
- Contexto;
- Privacidade;
- Responsabilidade;
- Proteção;
- Presença.

> **HeroGuard — Menos ruído. Mais contexto.**  
> **Proteção também é presença.**

### 1.7 Relação com a primeira versão da landing page

Nesta primeira versão, os conceitos de inteligência artificial, classificações, minicards, análise contextual e redução de ruído serão apresentados apenas por meio de narrativa, ilustrações, animações ou simulações visuais.

Não haverá análise real de mensagens, integração com aplicativos, classificação funcional ou processamento de dados. A landing page deve apresentar a visão da plataforma sem sugerir que esses recursos já estão disponíveis.

## 2. Objetivos

### Objetivo principal

Fazer com que o visitante:

1. Entenda os desafios da vida digital dos filhos;
2. Perceba a importância de acompanhar esse ambiente com responsabilidade;
3. Conheça a proposta do HeroGuard;
4. Tenha interesse em participar da lista de espera.

### Chamada principal para ação

> **QUERO PROTEGER MEUS FILHOS**

O CTA deve aparecer em pontos estratégicos da página, especialmente no hero e na mensagem final.

> **Comportamento do modal (implementado em 2026-10-28):** o modal solicita
> nome, e-mail e telefone (WhatsApp), com máscara brasileira, e exige aceite
> explícito do Aviso de Privacidade, registrando a versão aceita. O envio vai
> para `POST /api/waitlist`; em caso de falha ou erro de validação, o
> usuário vê a mensagem correspondente e o botão fica desabilitado durante
> o envio. A confirmação (“Dados recebidos”) só aparece após a gravação
> real. Detalhes técnicos e do banco: `docs/implementation-progress.md`.

## 3. Escopo da primeira versão

### Incluído

- Landing page institucional responsiva;
- Apresentação do problema;
- Storytelling sobre a presença digital de crianças e adolescentes;
- Apresentação conceitual do HeroGuard;
- Demonstrações visuais e simulações da futura experiência do produto;
- Elementos visuais de classificação `GREEN`, `YELLOW` e `RED`;
- CTAs e botões apresentados visualmente, sem ações funcionais nesta versão;
- Footer institucional.

### Fora do escopo

A primeira versão não deverá implementar:

- Login;
- Cadastro funcional;
- Dashboard funcional;
- Integração real com WhatsApp;
- Integração real com Instagram;
- Monitoramento real;
- Pagamentos;
- Área administrativa;
- Backend funcional;
- Processamento real de mensagens;
- Análise real por inteligência artificial.

Qualquer dashboard, conversa, alerta, contato, classificação ou análise exibida deverá ser tratada como demonstração visual ou simulação, sem sugerir que existe processamento real por trás da interface.

### Decisão tecnológica aprovada

- **Framework:** Next.js, com React, App Router e TypeScript.
- **Diretriz de renderização:** abordagem estática primeiro, pré-renderizando a landing page sempre que possível. Não adicionar backend, API ou renderização dinâmica no servidor sem uma necessidade aprovada; o modo exato de build/saída e a hospedagem serão definidos quando a infraestrutura de publicação estiver confirmada.
- **Experiência do vídeo:** concentrar o estado interativo da abertura/reprodução em um componente de cliente; manter o conteúdo textual e visual da página estático por padrão.
- **Racional:** Next.js oferece uma base integrada de React, roteamento e build, tem ecossistema consolidado e permite servir páginas pré-renderizadas. O custo é uma estrutura e complexidade maiores que HTML/CSS/JavaScript simples ou uma solução estática mais leve; a escolha prioriza a evolução e o ecossistema solicitado.

**Fontes consultadas em 2026-10-12:**

- [Documentação oficial do Next.js](https://nextjs.org/docs) — descreve Next.js como framework React e documenta o App Router.
- [Exportação estática no Next.js](https://nextjs.org/docs/app/guides/static-exports) — descreve a geração de arquivos estáticos para hospedagem em servidor web estático.
- [State of React 2025 — Libraries](https://2025.stateofreact.com/he-HE/libraries) — lista Next.js com 80% de uso entre os respondentes daquela pesquisa específica; esse resultado não deve ser generalizado para todo o mercado.

## 4. Conceito da experiência

A experiência deve combinar três referências principais:

- Trailer de cinema;
- Apresentação de produto SaaS premium;
- Campanha emocional sobre parentalidade e proteção digital.

A landing page não deve se comportar como uma página corporativa tradicional. O conteúdo deve ser conduzido por narrativa, ritmo visual, suspense leve e transições suaves.

### Sensações desejadas

- Cinematografia;
- Curiosidade;
- Suspense leve;
- Proteção;
- Tecnologia;
- Confiança;
- Responsabilidade dos pais;
- Presença na vida dos filhos.

### Evitar

- Aparência de sistema administrativo;
- Blocos estáticos em excesso;
- Excesso de texto;
- Aparência infantil;
- Linguagem alarmista;
- Terror psicológico;
- Excesso de cores ou elementos decorativos;
- Comunicação que faça os pais se sentirem culpados.

## 5. Mensagem central

> **Seu filho conversa todos os dias com pessoas que você talvez nunca conheça. Você sabe quem está do outro lado da tela?**

### Apresentação da solução

> **HeroGuard. Uma nova forma de acompanhar a vida digital dos seus filhos.**

A comunicação deve apresentar o HeroGuard como uma ferramenta de acompanhamento parental transparente: o responsável tem acesso às conversas e informa o filho sobre esse acompanhamento, com o objetivo de protegê-lo e apoiar o diálogo familiar.

## 6. Público-alvo

O público principal é composto por:

- Pais;
- Mães;
- Responsáveis por crianças e adolescentes;
- Pais de adolescentes que utilizam WhatsApp e Instagram.

### Contexto do visitante

O visitante provavelmente:

- Sabe que o filho utiliza redes sociais;
- Sabe que o filho conversa diariamente pelo celular;
- Não consegue acompanhar todas as interações;
- Tem curiosidade sobre com quem o filho conversa;
- Demonstra preocupação com segurança digital;
- Deseja perceber situações nas redes sociais que possam merecer atenção;
- Tem uma rotina de trabalho e pouco tempo para acompanhar de perto as relações digitais dos filhos;
- Pretende informar o filho sobre o uso do HeroGuard e exercer um acompanhamento parental transparente.

### Diretrizes de linguagem

A comunicação deve ser acolhedora, responsável e não acusatória.

Evitar:

> “Você está colocando seu filho em perigo.”

Preferir:

> “Você conhece o mundo digital em que seu filho está crescendo?”

## 7. Identidade visual

### Direção artística

**Decisão aprovada:** a direção visual deve transmitir família, proteção, confiança, presença e diálogo. Não deve parecer sombria nem remeter a cybersegurança, vigilância ou investigação.

O visual continua premium e cinematográfico, mas a cinematografia deve vir da composição, da luz e da narrativa humana — não de suspense, escuridão ou efeitos de monitoramento.

Referências conceituais:

- Fotografia editorial/documental de relações familiares acolhedoras e respeitosas;
- Luz natural e ambientes cotidianos;
- Apresentação premium de produto com tecnologia discreta;
- Gráficos simples e organizados para explicar contexto, sem metáforas de radar ou central de vigilância.

### Paleta de cores

**Direção aprovada:** usar cores mais aconchegantes e uma base visual clara/humana. Evitar preto, grafite e azul muito escuro como cores dominantes, assim como ciano neon e brilhos frios.

**Hipótese de paleta para a próxima iteração (a validar visualmente):** off-white/creme e areia como base; tons quentes suaves e detalhes de madeira; verde-sálvia, teal suave ou azul dessaturado apenas como acentos tecnológicos. Manter contraste acessível em textos e controles. Esta hipótese não fixa tokens ou códigos hexadecimais.

As cores associadas às classificações `GREEN`, `YELLOW` e `RED` continuam reservadas para elementos relacionados à classificação das conversas e dos contatos.

### Atributos da marca

A identidade visual deve transmitir:

**Família + Proteção + Presença + Diálogo + Confiança**, com tecnologia e inteligência apresentadas de forma discreta.

### Wordmark e cor da marca

**Decisão aprovada:** todas as ocorrências visuais do wordmark `HeroGuard` devem corresponder à cor da logo aprovada. O teal de marca identificado na V5 é `#276C63`; mantê-lo num token próprio (`--brand`), separado do acento genérico da interface (`--accent`), mesmo enquanto os valores forem iguais. Aplicar ao header, footer, títulos de marca, mockups conceituais e menções inline estilizadas como marca. Não recolorir o restante do tema nem os níveis GREEN/YELLOW/RED.

## 8. Estrutura da página

A página deverá seguir aproximadamente a sequência abaixo.

### 8.1 Header

Responsável por apresentar a marca HeroGuard e oferecer navegação ou acesso ao CTA, conforme a definição visual da implementação.

Implementado em 2026-10-23: header **fixo** (acompanha a rolagem) com navegação para `#visao`, `#conceito`, `#sinais`, `#demonstracao` e `#privacidade`. Abaixo de 1000px os links viram um botão *Menu* com painel suspenso; abaixo de 520px o botão fica só com o ícone e abaixo de 380px o CTA do header é ocultado (o hero e a mensagem final mantêm o CTA principal).

### 8.2 Hero com vídeo cinematográfico

A primeira dobra deve introduzir o tema com uma pergunta forte:

> **Você sabe com quem seu filho conversa todos os dias?**

O hero deve conter uma área de vídeo ou conteúdo audiovisual cinematográfico e uma chamada para a lista de espera.

**Comportamento na v0.1 (simulação):** não haverá arquivo de vídeo. O espaço reservado simulará a reprodução com um contador de 10 segundos e um indicador de progresso. Ao abrir a página, a simulação inicia automaticamente e a rolagem fica bloqueada. A navegação é liberada quando o contador chega a zero ou quando o visitante clica em **“ir para a pagina”**. Depois da liberação, a área permanece no topo do documento com a simulação pausada, e o visitante pode rolar a página.

Requisitos da simulação:

- O botão **“ir para a pagina”** deve ficar visível junto à área durante a contagem, para permitir pular a espera;
- O contador deve ser apenas visual, sem alegar que existe processamento ou análise real;
- A rolagem bloqueada não deve prender o foco do teclado nem impedir o acesso ao conteúdo por leitores de tela;
- O botão deve ser acionável por teclado.

#### Comportamento aprovado para a versão com vídeo real

**Estado atual:** ainda não existe arquivo de vídeo; há somente o espaço reservado. Até a mídia ser fornecida, o comportamento de abertura deve ser desenvolvido e testado com uma simulação claramente identificada, sem alegar reprodução real.

- Ao abrir a página, o vídeo inicia automaticamente em primeiro plano, como uma camada de abertura.
- A landing page fica visível atrás do vídeo, escurecida e translúcida; durante a abertura, o vídeo é o foco visual.
- O visitante pode usar o botão **“ir para a pagina”** para encerrar a abertura antecipadamente.
- Quando o vídeo terminar naturalmente — ou quando o visitante escolher ir para a página — a camada de abertura sai de primeiro plano e a landing page passa para primeiro plano.
- Na página liberada, o vídeo permanece no topo, imediatamente antes do título do hero, em pausa.
- Deve haver um botão **“assistir novamente”** junto ao vídeo pausado. Ao acioná-lo, o vídeo recomeça em primeiro plano e a página volta a ficar escurecida ao fundo; ao terminar, a página é revelada novamente.
- A transição entre a camada de abertura e a página deve ser suave e não pode deixar o conteúdo inacessível por teclado ou leitor de tela.

Este comportamento descreve a versão com vídeo real; a simulação v0.1 continua sem arquivo de vídeo e está documentada separadamente acima.

### 8.3 O mundo digital

Seção destinada a mostrar que diversas conversas acontecem simultaneamente e que o ambiente digital dos filhos é amplo, dinâmico e difícil de acompanhar por completo.

### 8.4 O problema

Apresentar a dificuldade dos pais sem utilizar culpa ou alarmismo.

Mensagem sugerida:

> **Você não precisa olhar tudo.**  
> **Precisa saber onde olhar.**

#### Interlúdio editorial — caso noticiado (proposta)

**Posição:** após a seção 8.4 e antes da 8.5. O bloco deve dar contexto sem abrir a página pelo medo nem funcionar como argumento de venda baseado em ameaça.

**Caso-base aprovado pelo usuário:** reportagens de 13–14 de outubro de 2026 sobre uma adolescente brasileira que viajou sozinha a Portugal para encontrar uma pessoa que conheceu online. O Globo relata que os responsáveis já sabiam do contato online desde agosto, mas não da viagem; o UOL informa que ela foi localizada em segurança e que a investigação seguia em Portugal. “Rapto” deve aparecer apenas como alegação atribuída à família, não como conclusão criminal. A jovem não viajou acompanhada pela pessoa que conheceu online.

**Copy atualizada em 2026-10-23:** o bloco foi reduzido a uma manchete de
uma frase, em tipografia grande, seguida da citação das fontes. O rótulo
"Uma notícia, com contexto" substitui "Resumo editorial".

> **Adolescente viajou sozinha para encontrar alguém que conheceu online.**

**Referência dos fatos, sem links clicáveis:** UOL — reportagem publicada em
14 de outubro de 2026, que informa que a adolescente foi localizada em
Portugal; O Globo — reportagem publicada em 13 de outubro de 2026, sobre a
viagem para encontrar uma pessoa conhecida online. Os links e os títulos
originais não são exibidos para evitar expor dados identificáveis da menor.

Não usar nome, rosto, idade exata, cidade de origem, escola, identificação dos responsáveis, perfis, capturas de conversas, detalhes de abuso ou reconstituição do caso. Identificar o bloco com o rótulo "Uma notícia, com contexto" e manter a manchete curta e a atribuição dos veículos/datas visíveis, sem links clicáveis. Não sugerir que o HeroGuard detectaria, impediria ou teria evitado o ocorrido. A fonte externa pode revelar dados de identificação; esse risco deve ser considerado na revisão final antes da publicação.

### 8.5 A virada

Reposicionar o problema como uma oportunidade de acompanhamento parental transparente e diálogo, sem sugerir monitoramento oculto.

Mensagem sugerida:

> **Não é sobre controlar.**  
> **É sobre estar presente.**

### 8.6 Apresentação do HeroGuard

Introduzir o produto como uma nova forma de acompanhar a vida digital dos filhos.

**Motion das telas do beta:** a seção “Como funciona” usa as cinco telas em
`public/HeroGuard_tela01.png` a `public/HeroGuard_tela05.png` em um carrossel
contínuo, sem cenário ou fundo decorativo adicional. A tela ativa aparece em
primeiro plano; a anterior e a próxima ficam menores e translúcidas atrás
dela. Zoom e transições suaves acompanham a troca.

O visitante pode deslizar horizontalmente, usar as setas, os indicadores ou as
teclas ←/→. O carrossel pausa quando sai da viewport e respeita
`prefers-reduced-motion` (sem reprodução automática nesse modo). O controle
manual de pausar/retomar foi removido (2026-10-23): a reprodução automática
segue em loop e a navegação manual não a interrompe. As telas são responsivas
e a sequência informa abertura, conexão de contas, conversas, alerta
contextual e resumo.

#### Privacidade e proteção de dados (proposta)

**Posição:** após a apresentação conceitual do HeroGuard e antes da seção 8.7. O bloco responde à preocupação com privacidade no momento em que o visitante conhece a proposta, sem parecer uma funcionalidade operacional.

**Copy proposta:**

> **Privacidade é um princípio do projeto.**
>
> A forma de proteção dos dados — incluindo se e como as mensagens serão criptografadas — será definida junto com a arquitetura da plataforma. Esta demonstração não processa conversas e não implementa criptografia.

Não afirmar que “todas as mensagens” já são ou serão criptografadas, nem que a criptografia “evitará vazamentos”. Escopo, arquitetura, gestão de chaves, dados abrangidos e controles de acesso ainda não estão definidos. Qualquer alegação futura deverá ser validada tecnicamente antes da publicação.

> **Decisão do usuário (2026-10-24):** a copy foi alterada para
> **“Mensagens protegidas por criptografia.”**, afirmando que as mensagens de
> texto das conversas são criptografadas para evitar vazamentos não
> autorizados — decisão do usuário de tratar a criptografia das mensagens
> como compromisso do produto em operação. A peça visual correspondente é o
> infográfico animado `components/PrivacidadeMotion.tsx` (ver seção 9).

### 8.7 Inteligência artificial e classificações

Apresentar visualmente a ideia de análise contextual por meio das classificações:

- `GREEN`;
- `YELLOW`;
- `RED`.

A seção pode incluir minicards de contatos e exemplos de conversas, desde que todos os dados sejam fictícios e utilizados apenas para demonstração visual.

Nesta versão, não existe análise real de mensagens ou inteligência artificial funcional.

> **Implementação (2026-10-23):** 8.7 e 8.8 são apresentadas em **uma única seção** (“05 — Sinais, não sentenças”): os três níveis GREEN/YELLOW/RED em cartões e, abaixo, os conceitos de 8.8 como lista compacta de quatro itens (Conversas, Contatos, Alertas, Inteligência e contexto). O aviso único cobre cores, exemplos e recursos.

### 8.8 Funcionalidades conceituais

Apresentar, de forma visual e resumida, os conceitos que poderão fazer parte do produto futuro:

- Conversas;
- Contatos;
- Alertas;
- Inteligência;
- Contexto.

Esses itens devem ser apresentados como visão do produto, sem afirmar que estão disponíveis ou funcionais na primeira versão.

### 8.9 Experiência interativa

Incluir uma simulação da experiência do HeroGuard, como uma interface demonstrativa ou sequência interativa de telas. A demonstração pode simular a abertura de uma conversa sinalizada ou não sinalizada e a visualização das mensagens daquele contato.

A simulação deve usar apenas mensagens e dados fictícios, reforçar o conceito do produto e não realizar monitoramento, integração ou processamento real.

> **Implementação (2026-10-28):** a seção “05 — Veja na prática” usa o
> componente `components/VejaNaPraticaMotion.tsx`, uma conversa animada em
> janela escura com fundo transparente ao redor. A sequência, controlada por
> estado no React (não por keyframes CSS sincronizados, para não desalinhar
> nas repetições), executa em loop enquanto a seção está visível:
>
> 1. indicador de digitação com três pontos (lado do contato e lado do
>    adolescente, com rótulo “Alex digitando”);
> 2. as três mensagens curtas entram em ordem — “Consegue ir no sábado?”,
>    “Acho que meus pais não vão deixar...”, “Fala que vai com uma amiga.”;
> 3. **apenas no final**, entra o banner **AMARELO** (“Sinal de atenção — um
>    ponto de partida para compreender o contexto”), com glow pulsante;
> 4. a nota “Uma classificação não é conclusão...” encerra a cena, seguida de
>    uma pausa de leitura e um fade suave que reinicia o ciclo.
>
> O loop só roda quando a seção está na viewport (`IntersectionObserver`) e,
> com `prefers-reduced-motion`, a conversa completa aparece estática, sem
> indicadores de digitação. Nomes e mensagens são fictícios; o rodapé do
> cartão mantém o aviso de demonstração.

### 8.10 Mensagem final

Encerrar a narrativa com uma mensagem emocional e um CTA de conversão.

Mensagem sugerida:

> **Proteção também é presença.**

CTA:

> **QUERO PROTEGER MEUS FILHOS**

### 8.11 Footer

O footer deverá encerrar a página com as informações institucionais definidas para o projeto. O conteúdo específico ainda deverá ser detalhado em uma versão futura da documentação.

## 9. Requisitos de interação e animação

A experiência deve priorizar:

- Uma navegação bastante fluida, com efeitos e animações ao longo da página;
- Animações e transições acionadas durante a rolagem, conduzindo a passagem entre as seções;
- Microinterações;
- Transições cinematográficas;
- Ritmo visual progressivo entre as seções;
- Destaque controlado para o CTA;
- Boa experiência em dispositivos móveis e desktop.

### Motion graphics da seção “Um mundo em movimento”

**Decisão aprovada:** substituir a imagem raster exibida na seção por uma composição vetorial SVG em camadas, após revisão do asset, e animar seus elementos em um loop suave. A sequência deve revelar os elementos um a um, conectar os grupos digitais e apresentar o logo/wordmark HeroGuard por último, nas cores originais da marca (`#276C63`). Depois de uma breve pausa, o ciclo reinicia sem corte brusco.

Requisitos: manter proporção 4:3 e composição da V5 aprovada; preservar textos legíveis; não usar PNG/JPG embutido na arte final nem vídeo; pausar a animação fora da viewport; com `prefers-reduced-motion: reduce`, mostrar a composição completa em estado estático. Evitar radar, flash, pulsos de alerta ou movimento frenético.

**Primeira implementação para revisão:** loop de 12,8 s, com revelação sequencial dos grupos, conexões desenhadas, logo por último, pausa e reinício suave. O ritmo é um primeiro ajuste técnico e pode ser calibrado após o usuário revisar a prévia.

As animações devem apoiar o storytelling e não prejudicar legibilidade, desempenho ou acessibilidade.

### Motion Graphics — interlúdio editorial e privacidade

- **Caso noticiado:** ~~composição editorial curta, com entrada única e estado final estável~~. **Revisado em 2026-10-23:** a arte com cartões abstratos foi **removida** — os três retângulos não carregavam informação e pareciam vazios. O bloco ficou sem animação, com o rótulo "Uma notícia, com contexto", uma manchete curta em letras grandes e a citação das fontes abaixo, sem links clicáveis.
- **Privacidade:** ~~peça conceitual pequena com cartões abstratos e movimento discreto~~. **Revisado em 2026-10-28:** substituída pelo infográfico animado `components/PrivacidadeMotion.tsx` — fundo 100% transparente, sem textos ou cartões, apenas o desenho: escudo HeroGuard com cadeado no centro, três órbitas concêntricas girando em direções alternadas, pulsos de radar esmeralda/dourado expandindo do centro e três nós periféricos (chave criptográfica, radar de contexto e cofre familiar) ligados ao escudo por feixes com fluxo de luz contínuo. Substituiu o `NotaPrivacidade` original (cartões tracejados one-shot), que deixou de ser usado. As animações param com `prefers-reduced-motion`.
- Na peça de privacidade, não bloquear rolagem; manter o conteúdo essencial disponível sem animação; respeitar `prefers-reduced-motion`; organizar o conteúdo verticalmente em telas móveis e evitar redução do tamanho do texto.

## 10. Requisitos de conteúdo e confiança

- Usar linguagem clara e acolhedora;
- Evitar afirmações de monitoramento já disponível;
- Não apresentar dados reais de crianças, pais ou conversas;
- Utilizar dados fictícios em todas as simulações;
- Diferenciar claramente demonstrações visuais de funcionalidades implementadas;
- Evitar promessas técnicas que ainda não possam ser cumpridas;
- Reforçar a ideia de presença e proteção responsável;
- Não tratar privacidade como algo incompatível com segurança familiar.

## 11. Critérios de aceite da landing page

A primeira versão será considerada alinhada à especificação quando:

- Apresentar claramente o HeroGuard e sua proposta;
- Comunicar o problema sem culpa ou alarmismo;
- Seguir a narrativa definida nas seções principais;
- Utilizar a direção visual premium, tecnológica e cinematográfica;
- Exibir o CTA **QUERO PROTEGER MEUS FILHOS**;
- Permitir que o visitante entenda que a página é uma apresentação inicial/lista de espera;
- Não sugerir que login, dashboard, integrações, monitoramento ou análise de mensagens já estão funcionais;
- Atribuir qualquer caso noticiado com fonte e contexto; não identificar a adolescente nem insinuar que o HeroGuard teria evitado o caso;
- Distinguir princípios de privacidade de medidas técnicas implementadas; não prometer criptografia ou prevenção de vazamentos antes de validação;
- Garantir alternativa sem movimento e leitura acessível para os Motion Graphics novos;
- Utilizar apenas dados fictícios nas demonstrações;
- Funcionar adequadamente em desktop e dispositivos móveis;
- Manter coerência entre textos, identidade visual e proposta de proteção responsável.

## 12. Evolução futura

A landing page poderá posteriormente ser conectada a:

- ~~Cadastro real para lista de espera~~ **Implementado em 2026-10-28:** o
  formulário grava na tabela `waitlist` do Postgres da stack via API
  (`api/server.js`, imagem `wallesonnn/heroguard-api`). O contato pelo
  WhatsApp será feito por fluxo n8n que consulta essa tabela.
- Autenticação;
- Dashboard do responsável;
- Integrações com WhatsApp e Instagram;
- Monitoramento autorizado;
- Classificação contextual de conversas;
- Alertas;
- Pagamentos;
- Área administrativa.

Essas evoluções não fazem parte do escopo da versão 0.2.
