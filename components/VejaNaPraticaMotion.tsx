"use client";

import { useEffect, useRef, useState } from "react";

// Fases da linha do tempo da conversa:
// 0: Reset / pausa inicial (preparação)
// 1: Alex digitando...
// 2: Mensagem 1 visível (Alex)
// 3: Filho digitando...
// 4: Mensagem 2 visível (Filho)
// 5: Alex digitando...
// 6: Mensagem 3 visível (Alex)
// 7: Sinal contextual AMARELO revelado (atenção!)
// 8: Nota contextual revelada + leitura final
// 9: Fade out suave para reiniciar o loop
type ChatPhase = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export function VejaNaPraticaMotion() {
  const [phase, setPhase] = useState<ChatPhase>(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !isInView) return;

    let timeout: NodeJS.Timeout;

    // Duração de cada etapa (ritmo humano, calmo e cadenciado)
    switch (phase) {
      case 0:
        // Pequena pausa limpa antes de começar o ciclo
        timeout = setTimeout(() => setPhase(1), 350);
        break;
      case 1:
        // Alex digitando mensagem 1
        timeout = setTimeout(() => setPhase(2), 1700);
        break;
      case 2:
        // Mensagem 1 exibida, pausa para leitura
        timeout = setTimeout(() => setPhase(3), 1900);
        break;
      case 3:
        // Filho digitando resposta
        timeout = setTimeout(() => setPhase(4), 1700);
        break;
      case 4:
        // Mensagem 2 exibida, pausa para leitura
        timeout = setTimeout(() => setPhase(5), 1900);
        break;
      case 5:
        // Alex digitando mensagem 3
        timeout = setTimeout(() => setPhase(6), 1700);
        break;
      case 6:
        // Mensagem 3 exibida
        timeout = setTimeout(() => setPhase(7), 1500);
        break;
      case 7:
        // Sinal contextual AMARELO entra em destaque
        timeout = setTimeout(() => setPhase(8), 1500);
        break;
      case 8:
        // Nota contextual visível — tempo para contemplar a cena completa
        timeout = setTimeout(() => setPhase(9), 4500);
        break;
      case 9:
        // Fade out suave de fechamento
        timeout = setTimeout(() => setPhase(0), 600);
        break;
    }

    return () => clearTimeout(timeout);
  }, [phase, reducedMotion, isInView]);

  // Se preferir movimento reduzido, exibe toda a cena completa sem animação
  const showTyping1 = !reducedMotion && phase === 1;
  const showMsg1 = reducedMotion || (phase >= 2 && phase <= 8);

  const showTyping2 = !reducedMotion && phase === 3;
  const showMsg2 = reducedMotion || (phase >= 4 && phase <= 8);

  const showTyping3 = !reducedMotion && phase === 5;
  const showMsg3 = reducedMotion || (phase >= 6 && phase <= 8);

  const showSignal = reducedMotion || (phase >= 7 && phase <= 8);
  const showNote = reducedMotion || (phase >= 8 && phase <= 8);
  const isFadingOut = !reducedMotion && phase === 9;

  return (
    <div
      ref={containerRef}
      className={`chat-demo chat-demo-dark ${isFadingOut ? "chat-fading-out" : ""}`}
      role="group"
      aria-label="Exemplo ilustrativo de conversa com sinal de atenção"
    >
      <div className="chat-window">
        {/* Cabeçalho do contato */}
        <div className="chat-head">
          <div className="demo-avatar">A</div>
          <div>
            <strong>
              Alex S. <span>contato recente</span>
            </strong>
          </div>
        </div>

        {/* Corpo das mensagens */}
        <div className="chat-body">
          {/* Mensagem 1 (Alex) */}
          {showTyping1 && (
            <div className="chat-typing typing-in" aria-hidden="true">
              <span className="typing-label">Alex digitando</span>
              <i></i>
              <i></i>
              <i></i>
            </div>
          )}
          {showMsg1 && (
            <div className="chat-bubble bubble-in chat-bubble-enter">
              Consegue ir no sábado?
              <time>16:42</time>
            </div>
          )}

          {/* Mensagem 2 (Adolescente) */}
          {showTyping2 && (
            <div className="chat-typing typing-out" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
            </div>
          )}
          {showMsg2 && (
            <div className="chat-bubble bubble-out chat-bubble-enter">
              Acho que meus pais não vão deixar...
              <time>16:45</time>
            </div>
          )}

          {/* Mensagem 3 (Alex) */}
          {showTyping3 && (
            <div className="chat-typing typing-in" aria-hidden="true">
              <span className="typing-label">Alex digitando</span>
              <i></i>
              <i></i>
              <i></i>
            </div>
          )}
          {showMsg3 && (
            <div className="chat-bubble bubble-in chat-bubble-enter">
              Fala que vai com uma amiga.
              <time>16:47</time>
            </div>
          )}
        </div>

        {/* Sinal AMARELO: aparece exclusivamente no final da sequência */}
        {showSignal && (
          <div className="context-banner context-banner-dark context-banner-enter">
            <span className="context-symbol">i</span>
            <span>
              <strong>Sinal de atenção</strong>
              <small>Um ponto de partida para compreender o contexto.</small>
            </span>
            <span className="context-tag">AMARELO</span>
          </div>
        )}

        {/* Nota explicativa */}
        {showNote && (
          <div className="chat-context-note chat-note-dark chat-note-enter">
            <span aria-hidden="true">✳</span>
            <span>Uma classificação não é conclusão. Conhecer o contexto vem primeiro.</span>
          </div>
        )}
      </div>

      <div className="chat-footer">Exemplo com nomes e mensagens fictícios para demonstração</div>
    </div>
  );
}
