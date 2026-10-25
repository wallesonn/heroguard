"use client";

import { useEffect, useRef, useState } from "react";

export default function PrivacidadeMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="privacy-infographic-motion"
      data-inview={isInView ? "true" : "false"}
      role="img"
      aria-label="Infográfico animado de criptografia e privacidade do HeroGuard"
    >
      <svg
        className="privacy-infographic-svg"
        viewBox="0 0 680 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Gradientes do Escudo Central e Nós */}
          <linearGradient id="shieldGradColor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="45%" stopColor="#20665e" />
            <stop offset="100%" stopColor="#103c37" />
          </linearGradient>

          <radialGradient id="auraGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.25" />
            <stop offset="55%" stopColor="#20665e" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#20665e" stopOpacity="0" />
          </radialGradient>

          <filter id="cleanGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* GRUPO PRINCIPAL: Todo o infográfico com centro exato em (340, 170) */}
        <g transform="translate(340, 170)">
          {/* 1. Aura Central Translúcida */}
          <circle cx="0" cy="0" r="145" fill="url(#auraGlowGrad)" />

          {/* 2. Feixes Conectando os Nós ao Centro */}
          {/* Rota Esquerda (Criptografia) */}
          <path
            d="M -190 0 C -120 -20, -70 -10, -42 0"
            className="infographic-beam infographic-beam--left"
            stroke="#2dd4bf"
            strokeWidth="2.5"
            strokeDasharray="6 7"
          />
          {/* Rota Topo (Contexto) */}
          <path
            d="M 0 -105 L 0 -45"
            className="infographic-beam infographic-beam--top"
            stroke="#f0c95c"
            strokeWidth="2.5"
            strokeDasharray="5 6"
          />
          {/* Rota Direita (Soberania) */}
          <path
            d="M 190 0 C 120 -20, 70 -10, 42 0"
            className="infographic-beam infographic-beam--right"
            stroke="#2dd4bf"
            strokeWidth="2.5"
            strokeDasharray="6 7"
          />

          {/* 3. Órbitas Concêntricas Giratórias (centro em 0, 0) */}
          <circle
            cx="0"
            cy="0"
            r="135"
            stroke="rgba(45, 212, 191, 0.28)"
            strokeWidth="1.5"
            strokeDasharray="8 12"
            className="infographic-orbit infographic-orbit--outer"
          />
          <circle
            cx="0"
            cy="0"
            r="100"
            stroke="rgba(240, 201, 92, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            className="infographic-orbit infographic-orbit--mid"
          />
          <circle
            cx="0"
            cy="0"
            r="68"
            stroke="rgba(45, 212, 191, 0.45)"
            strokeWidth="1.5"
            strokeDasharray="4 7"
            className="infographic-orbit infographic-orbit--inner"
          />

          {/* 4. Ondas de Pulso de Radar Expandindo a partir do centro */}
          <circle cx="0" cy="0" r="42" className="infographic-radar infographic-radar--1" />
          <circle cx="0" cy="0" r="42" className="infographic-radar infographic-radar--2" />
          <circle cx="0" cy="0" r="42" className="infographic-radar infographic-radar--3" />

          {/* 5. Três Nós Periféricos Perfeitamente Posicionados */}
          {/* Nó Esquerdo: Criptografia de Chave */}
          <g transform="translate(-190, 0)">
            <g className="infographic-node-content infographic-node--left">
              <circle cx="0" cy="0" r="28" fill="rgba(45, 212, 191, 0.12)" />
              <circle cx="0" cy="0" r="20" fill="#13232b" stroke="#2dd4bf" strokeWidth="2" filter="url(#cleanGlow)" />
              {/* Ícone Chave */}
              <circle cx="-3" cy="-3" r="5" stroke="#2dd4bf" strokeWidth="2" fill="none" />
              <path d="M 1 1 L 8 8 M 5 5 L 7 3 M 7 7 L 9 5" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>

          {/* Nó Topo: Contexto / Radar */}
          <g transform="translate(0, -105)">
            <g className="infographic-node-content infographic-node--top">
              <circle cx="0" cy="0" r="28" fill="rgba(240, 201, 92, 0.12)" />
              <circle cx="0" cy="0" r="20" fill="#222017" stroke="#f0c95c" strokeWidth="2" filter="url(#cleanGlow)" />
              {/* Ícone Radar */}
              <circle cx="0" cy="1" r="3" fill="#f0c95c" />
              <path d="M -8 -3 A 9 9 0 0 1 8 -3" stroke="#f0c95c" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M -13 -7 A 15 15 0 0 1 13 -7" stroke="#f0c95c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            </g>
          </g>

          {/* Nó Direito: Soberania / Cofre Familiar */}
          <g transform="translate(190, 0)">
            <g className="infographic-node-content infographic-node--right">
              <circle cx="0" cy="0" r="28" fill="rgba(45, 212, 191, 0.12)" />
              <circle cx="0" cy="0" r="20" fill="#13232b" stroke="#2dd4bf" strokeWidth="2" filter="url(#cleanGlow)" />
              {/* Ícone Cofre / Proteção */}
              <path
                d="M 0 -8 L 8 -4 C 8 4 4 8 0 10 C -4 8 -8 4 -8 -4 Z"
                stroke="#2dd4bf"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="0" cy="1" r="2" fill="#2dd4bf" />
            </g>
          </g>

          {/* 6. Núcleo Central: O Escudo HeroGuard com Cadeado */}
          <g className="infographic-shield-core">
            {/* Halo de luz traseiro */}
            <circle cx="0" cy="0" r="44" fill="rgba(45, 212, 191, 0.18)" filter="url(#cleanGlow)" />

            {/* O Escudo */}
            <path
              d="M 0 -38 L 35 -22 C 35 12 19 36 0 46 C -19 36 -35 12 -35 -22 Z"
              fill="url(#shieldGradColor)"
              stroke="#5eead4"
              strokeWidth="3"
              filter="url(#cleanGlow)"
            />

            {/* Borda interna refinada */}
            <path
              d="M 0 -32 L 27 -19 C 27 7 15 27 0 35 C -15 27 -27 7 -27 -19 Z"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Cadeado Central */}
            <rect x="-8" y="2" width="16" height="15" rx="3" fill="#ffffff" />
            <path
              d="M -5 2 V -4 C -5 -6.8 -2.8 -9 0 -9 C 2.8 -9 5 -6.8 5 -4 V 2"
              stroke="#ffffff"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="0" cy="9" r="2" fill="#103c37" />
          </g>
        </g>
      </svg>
    </div>
  );
}
