import OpeningVideo from "@/components/OpeningVideo";
import SiteNav from "@/components/SiteNav";
import MundoEmMovimento from "@/components/MundoEmMovimento";
import ComoFuncionaMotion from "@/components/ComoFuncionaMotion";
import { VejaNaPraticaMotion } from "@/components/VejaNaPraticaMotion";
import PageEffects from "@/components/PageEffects";
import PrivacidadeMotion from "@/components/PrivacidadeMotion";
import { WaitlistButton, WaitlistProvider } from "@/components/Waitlist";

export default function Home() {
  return (
    <WaitlistProvider>
      <a className="skip-link" href="#main">Pular para o conteúdo</a>
      <div className="reading-progress" aria-hidden="true"><span></span></div>
      <PageEffects />

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="HeroGuard — início">
          <img className="brand-mark" src="/heroguard-logo-alpha.png" alt="" aria-hidden="true" width={924} height={939} />
          <span className="brand-wordmark"><span className="brand-hero">Hero</span><span className="brand-guard">Guard</span></span>
        </a>
        <SiteNav />
        <WaitlistButton className="header-cta">Começar agora</WaitlistButton>
      </header>

      <main id="main">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-backdrop" aria-hidden="true"><div className="hero-glow"></div><div className="hero-grain"></div></div>
          {/* Espaço reservado do vídeo: primeiro elemento do hero, antes do título. */}
          <OpeningVideo />
          <div className="hero-copy" data-reveal>
            <p className="eyebrow"><span className="eyebrow-dot"></span> Presença também é proteção</p>
            <h1 id="hero-title">Você sabe com quem seu filho <em>conversa todos os dias?</em></h1>
            <p className="hero-intro">O HeroGuard identifica sinais que pedem atenção nas conversas do seu filho — para você agir a tempo, com contexto e diálogo, sem precisar ler tudo.</p>
            <WaitlistButton className="button button-primary" describedBy="waitlist-note-hero">Quero proteger meus filhos</WaitlistButton>
            <p className="button-note" id="waitlist-note-hero">Próximos passos pelo WhatsApp · Leva menos de 30 segundos.</p>
          </div>
          <a className="scroll-cue" href="#vida-digital"><span className="scroll-line" aria-hidden="true"></span><span>Continue a história</span><span aria-hidden="true">↓</span></a>
        </section>

        <section className="editorial-section" aria-labelledby="editorial-title">
          <div className="section-shell">
            <div className="concept-heading" data-reveal>
              <p className="eyebrow">Uma notícia, com contexto</p>
              <h2 className="editorial-headline" id="editorial-title">
                Adolescente viajou sozinha para encontrar alguém que conheceu online.
              </h2>
            </div>
            <p className="editorial-sources" data-reveal>
              <strong>Fontes dos fatos:</strong>
              <br />
              UOL — reportagem publicada em 14 de outubro de 2026, que informa
              que a adolescente foi localizada em Portugal.
              <br />
              O Globo — reportagem publicada em 13 de outubro de 2026, sobre a
              viagem para encontrar uma pessoa conhecida online.
            </p>
          </div>
        </section>

        <section className="story-section digital" id="vida-digital" aria-labelledby="digital-title">
          <div className="section-shell digital-layout">
            <div className="section-copy" data-reveal>
              <p className="eyebrow">01 — Um mundo em movimento</p>
              <h2 id="digital-title">Uma vida inteira acontece <em>do outro lado da tela.</em></h2>
              <p>Amizades, conversas, descobertas. O cotidiano digital dos filhos se desdobra em muitas janelas — enquanto a vida real também pede atenção.</p>
            </div>
            {/* Arte aprovada (4:3), agora vetorial e animada: mesmo infográfico
                com logo central, conexões, grupos digitais e rótulos; loop de
                12,8 s que só roda com movimento permitido e na viewport.
                A descrição acessível vive no <title>/<desc> do componente. */}
            <MundoEmMovimento />
          </div>
          <div className="section-footnote"><span>O mundo digital não para.</span><span>Entender o contexto pode aproximar.</span></div>
        </section>

        <section className="presence-section" aria-labelledby="presence-title">
          <div className="presence-image">
            {/* Imagem aprovada como referência (ficção editorial; personagens fictícios). */}
            <img className="presence-photo" src="/presenca-dialogo-familiar-01.png" alt="Ilustração editorial fictícia: um adulto escuta com atenção um adolescente que segura um celular, em ambiente doméstico acolhedor." />
          </div>
          <div className="presence-copy" data-reveal>
            <p className="eyebrow">02 — A virada</p>
            <h2 id="presence-title">Não é sobre ver tudo.<br/><em>É sobre estar presente no essencial.</em></h2>
            <p>Acompanhamento transparente abre espaço para conversas melhores. O cuidado começa quando adultos e jovens sabem que estão do mesmo lado.</p>
            <div className="principle"><span className="principle-mark" aria-hidden="true">✳</span><span>Proteção com diálogo.<br/><strong>Confiança com responsabilidade.</strong></span></div>
          </div>
        </section>

        <section className="concept-section" id="conceito" aria-labelledby="concept-title">
          <div className="section-shell">
            <div className="concept-heading" data-reveal>
              <p className="eyebrow">03 — Como funciona</p>
              <h2 id="concept-title"><span className="brand-wordmark"><span className="brand-hero">Hero</span><span className="brand-guard">Guard</span></span>.<br/><em>Apenas 3 passos para acompanhar.</em></h2>
              <p>Em vez de vasculhar centenas de mensagens, você recebe um painel claro: o que está tranquilo e onde vale uma conversa hoje.</p>
            </div>
            <div className="how-steps" data-reveal role="list" aria-label="Como funciona em 3 passos">
              <article className="how-step" role="listitem">
                <span className="how-step-num">PASSO 01</span>
                <h3>Conecte</h3>
                <p>Informe seus dados de contato e receba no WhatsApp o passo a passo guiado para vincular o acompanhamento com transparência.</p>
              </article>
              <article className="how-step" role="listitem">
                <span className="how-step-num">PASSO 02</span>
                <h3>Acompanhe</h3>
                <p>O HeroGuard organiza o contexto das interações em níveis claros de atenção, sem expor você a um mar de notificações.</p>
              </article>
              <article className="how-step" role="listitem">
                <span className="how-step-num">PASSO 03</span>
                <h3>Converse</h3>
                <p>Use o contexto para abrir o diálogo certo na hora certa — com escuta, acolhimento e presença real.</p>
              </article>
            </div>
            <ComoFuncionaMotion />
          </div>
        </section>

        <section className="signals-section" id="sinais" aria-labelledby="signals-title">
          <div className="section-shell">
            <div className="signals-heading" data-reveal>
              <p className="eyebrow">04 — Sinais, não sentenças</p>
              <h2 id="signals-title">Uma indicação não conta<br/><em>a história inteira.</em></h2>
              <p>No <span className="brand-wordmark"><span className="brand-hero">Hero</span><span className="brand-guard">Guard</span></span>, diferentes níveis de atenção organizam as conversas para apoiar os pais. Uma classificação jamais substitui contexto, diálogo ou avaliação humana.</p>
            </div>
            <div className="signals-grid" data-reveal>
              <article className="signal-card"><span className="signal-label"><i className="signal-dot green"></i> VERDE · TRANQUILO</span><h3>Sem atenção especial</h3><p>Interações cotidianas dentro do esperado, sem sinais que peçam intervenção.</p><span className="signal-foot">Rotina acompanhada</span></article>
              <article className="signal-card"><span className="signal-label"><i className="signal-dot yellow"></i> AMARELO · ATENÇÃO</span><h3>Vale compreender</h3><p>Um sinal que serve como convite para se aproximar, conversar e entender melhor o contexto.</p><span className="signal-foot">Convite ao diálogo</span></article>
              <article className="signal-card"><span className="signal-label"><i className="signal-dot red"></i> VERMELHO · PRIORIDADE</span><h3>Prioridade de atenção</h3><p>Situação que pede olhar imediato dos pais. Um alerta não é prova — o contexto continua essencial.</p><span className="signal-foot">Atenção prioritária</span></article>
            </div>
          </div>
        </section>

        <section className="demo-section" id="demonstracao" aria-labelledby="demo-title">
          <div className="section-shell demo-layout">
            <div className="demo-copy" data-reveal>
              <p className="eyebrow">05 — Veja na prática</p>
              <h2 id="demo-title">Veja o sinal.<br/><em>Inicie a conversa.</em></h2>
              <p>Veja como o HeroGuard apresenta um ponto de atenção com contexto para ajudar você a conversar com seu filho no momento certo.</p>
              <span className="demo-badge"><i></i> EXEMPLO DE ALERTA CONTEXTUAL</span>
              <div className="demo-cta-wrap">
                <WaitlistButton className="button button-primary">Quero proteger meus filhos</WaitlistButton>
              </div>
            </div>
            <VejaNaPraticaMotion />
          </div>
        </section>

        <section className="privacy-section" id="privacidade" aria-labelledby="privacy-title">
          <div className="section-shell">
            <div className="concept-heading" data-reveal>
              <p className="eyebrow">06 — Privacidade e segurança</p>
              <h2 id="privacy-title">Mensagens protegidas por <em>criptografia.</em></h2>
              <p>
                Cuidado não é exposição. As mensagens de texto das conversas são criptografadas para
                evitar vazamentos não autorizados, garantindo que informações sensíveis da sua família
                permaneçam protegidas.
              </p>
            </div>
            <PrivacidadeMotion />
          </div>
        </section>

        <section className="closing-section" id="mensagem-final" aria-labelledby="closing-title">
          <div className="closing-glow" aria-hidden="true"></div>
          <div className="closing-content" data-reveal><p className="eyebrow">Menos ruído. Mais contexto.</p><h2 id="closing-title">Proteção também<br/><em>é presença.</em></h2><p>Informe seus dados de contato e receba no WhatsApp os próximos passos para começar a acompanhar com responsabilidade, escuta e proximidade.</p><WaitlistButton className="button button-primary" describedBy="waitlist-note-final">Quero proteger meus filhos</WaitlistButton><p className="button-note" id="waitlist-note-final">Próximos passos enviados diretamente no seu WhatsApp.</p></div>
          <div className="closing-orbit" aria-hidden="true"></div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#inicio" aria-label="HeroGuard — voltar ao início"><img className="brand-mark" src="/heroguard-logo-alpha.png" alt="" aria-hidden="true" width={924} height={939} /><span className="brand-wordmark"><span className="brand-hero">Hero</span><span className="brand-guard">Guard</span></span></a>
        <p>Menos ruído. Mais contexto.</p>
        <span className="footer-note">HeroGuard · Proteção digital com presença e diálogo</span>
        <a className="privacy-footer-link" href="/privacidade">Aviso de Privacidade</a>
        <a className="back-top" href="#inicio">Voltar ao início <span aria-hidden="true">↑</span></a>
      </footer>
    </WaitlistProvider>
  );
}
