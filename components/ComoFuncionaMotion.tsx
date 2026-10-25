"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

const screens = [
  {
    src: "/HeroGuard_tela01.png",
    alt: "Tela inicial do aplicativo HeroGuard, com o botão Começar.",
    label: "Comece com o HeroGuard",
    caption: "Proteção digital com presença e diálogo.",
  },
  {
    src: "/HeroGuard_tela02.png",
    alt: "Tela para conectar as contas de WhatsApp e Instagram.",
    label: "Contatos",
    caption: "Compreensão das relações digitais com cuidado.",
  },
  {
    src: "/HeroGuard_tela03.png",
    alt: "Lista de conversas organizadas por níveis de atenção.",
    label: "Conversas",
    caption: "Visão organizada das interações que importam.",
  },
  {
    src: "/HeroGuard_tela04.png",
    alt: "Conversa com um alerta contextual destacado.",
    label: "Alertas",
    caption: "Sinais claros para apoiar a atenção consciente dos pais.",
  },
  {
    src: "/HeroGuard_tela05.png",
    alt: "Resumo de segurança com visão geral das conversas do período.",
    label: "Inteligência e contexto",
    caption: "Análise contextual sempre apoiada pela avaliação humana.",
  },
];

const SCREEN_DURATION_MS = 3200;
const SWIPE_THRESHOLD_PX = 42;

function screenPosition(index: number, active: number): string {
  const rawOffset = (index - active + screens.length) % screens.length;
  const offset = rawOffset > Math.floor(screens.length / 2)
    ? rawOffset - screens.length
    : rawOffset;

  if (offset === 0) return "center";
  if (offset === 1) return "right";
  if (offset === -1) return "left";
  return offset > 0 ? "far-right" : "far-left";
}

export default function ComoFuncionaMotion() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pointerStartX = useRef<number | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reducedMotion) return;

    const timer = window.setTimeout(
      () => setActiveScreen((screen) => (screen + 1) % screens.length),
      SCREEN_DURATION_MS,
    );
    return () => window.clearTimeout(timer);
  }, [activeScreen, inView, reducedMotion]);

  const selectScreen = (index: number) => {
    setActiveScreen((index + screens.length) % screens.length);
  };

  const move = (direction: -1 | 1) => {
    setActiveScreen((screen) => (screen + direction + screens.length) % screens.length);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStartX.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const delta = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    move(delta < 0 ? 1 : -1);
  };

  const onPointerCancel = () => {
    pointerStartX.current = null;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  };

  return (
    <div className="product-motion" data-reveal>
      <div className="product-motion-heading">
        <p className="eyebrow">Da conexão ao diálogo</p>
        <h3>Veja o HeroGuard em ação</h3>
      </div>

      <div
        className="product-motion-stage"
        ref={stageRef}
        role="region"
        aria-label="Carrossel de telas do HeroGuard"
        aria-roledescription="carrossel"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onKeyDown={onKeyDown}
      >
        {screens.map((screen, index) => {
          const position = screenPosition(index, activeScreen);
          const isActive = position === "center";

          return (
            <div
              key={screen.src}
              className={`product-screen product-screen--${position}${index === 2 || index === 3 ? " has-rounded-edges" : ""}`}
              aria-hidden={!isActive}
            >
              <img src={screen.src} alt={screen.alt} width={337} height={601} draggable={false} />
            </div>
          );
        })}

        <button
          className="product-motion-arrow product-motion-arrow--prev"
          type="button"
          aria-label="Tela anterior"
          onClick={() => move(-1)}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          className="product-motion-arrow product-motion-arrow--next"
          type="button"
          aria-label="Próxima tela"
          onClick={() => move(1)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="product-motion-caption" aria-live={reducedMotion ? "polite" : "off"}>
        <div className="product-motion-caption-copy">
          <strong>{screens[activeScreen].label}</strong>
          <p>{screens[activeScreen].caption}</p>
        </div>
      </div>

      <div className="product-motion-controls" role="group" aria-label="Navegação das telas">
        <div className="product-motion-dots">
          {screens.map((screen, index) => (
            <button
              key={screen.src}
              type="button"
              className={`product-motion-dot${activeScreen === index ? " is-active" : ""}`}
              aria-label={`Mostrar tela ${index + 1}: ${screen.label}`}
              aria-current={activeScreen === index ? "step" : undefined}
              onClick={() => selectScreen(index)}
            />
          ))}
        </div>
      </div>
      <p className="product-motion-hint">Deslize para explorar as telas</p>
    </div>
  );
}
