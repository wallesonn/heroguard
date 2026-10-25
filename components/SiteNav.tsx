"use client";

/*
 * Navegação principal da landing page.
 * No desktop os links ficam inline no header (que é fixo). Abaixo de 1000px
 * o header vira um botão "Menu" que abre um painel suspenso com os mesmos
 * destinos. O painel fecha ao escolher um link, com Escape (devolvendo o
 * foco ao botão) ou ao voltar para a largura de desktop.
 */

import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#vida-digital", label: "Vida digital" },
  { href: "#conceito", label: "Como funciona" },
  { href: "#sinais", label: "Sinais" },
  { href: "#demonstracao", label: "Na prática" },
  { href: "#privacidade", label: "Privacidade" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    const onResize = () => {
      if (window.innerWidth > 1000) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <button
        ref={toggle}
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="nav-toggle-icon" aria-hidden="true"></span>
        <span className="nav-toggle-label">Menu</span>
      </button>
      <nav
        id="primary-nav"
        className={`primary-nav${open ? " is-open" : ""}`}
        aria-label="Navegação principal"
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
