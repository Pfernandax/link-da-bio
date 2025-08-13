"use client";

export const dynamic = "force-dynamic";   // não tentar gerar estático
export const revalidate = 0;              // sem cache de SSG
export const runtime = "edge";            // bom p/ Cloudflare (Next on Pages)

import React, { useMemo, useState } from "react";

/** Tipos simples */
type ThemeConfig = {
  background: { type: "color" | "gradient"; value: string };
  palette: { text: string; accent: string; muted: string; card: string };
  button: { variant: "solid" | "outline" | "ghost"; radius: number; shadow: "none" | "soft" | "lg" };
};

const INITIAL: ThemeConfig = {
  background: { type: "color", value: "#0b1020" },
  palette: { text: "#e5e7eb", accent: "#22d3ee", muted: "#94a3b8", card: "#111827" },
  button: { variant: "solid", radius: 18, shadow: "soft" },
};

const sampleLinks = [
  { id: "1", label: "Fale comigo no WhatsApp", url: "#" },
  { id: "2", label: "Agende um horário", url: "#" },
  { id: "3", label: "Me siga no Instagram", url: "#" },
];

/* ---------- UI helpers ---------- */
function Section({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <section className="bg-white/5 border border-white/10 rounded-2xl p-4">
      <h3 className="text-sm font-bold tracking-wide uppercase text-white/70 mb-3">{title}</h3>
      {children}
    </section>
  );
}

function Swatch({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <label className="w-28 text-sm text-white/80">{label}</label>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-12 rounded" />
      <input
        className="flex-1 bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Radio<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-white/80">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={
              "px-3 py-1.5 rounded-xl border text-sm " +
              (value === o.value ? "bg-white/15 border-white/25" : "bg-white/5 border-white/10 hover:bg-white/10")
            }
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Slider({ label, min, max, step = 1, value, onChange }: { label: string; min: number; max: number; step?: number; value: number; onChange: (n: number) => void }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm text-white/80">
        <span>{label}</span>
        <span className="tabular-nums text-white/60">{value}px</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full accent-white/80"
      />
    </div>
  );
}

function ButtonPreview({ label, cfg }: { label: string; cfg: ThemeConfig }) {
  const style: React.CSSProperties = useMemo(
    () => ({
      borderRadius: cfg.button.radius,
      color: cfg.button.variant === "solid" ? "#0b1020" : cfg.palette.accent,
      backgroundColor: cfg.button.variant === "solid" ? cfg.palette.accent : "transparent",
      borderColor: cfg.button.variant === "outline" ? cfg.palette.accent : "transparent",
      boxShadow:
        cfg.button.shadow === "none"
          ? "none"
          : cfg.button.shadow === "soft"
          ? "0 8px 24px rgba(0,0,0,.25)"
          : "0 12px 36px rgba(0,0,0,.35)",
    }),
    [cfg]
  );

  const className =
    "w-full font-semibold px-4 py-3 border transition-transform active:translate-y-px " +
    (cfg.button.variant === "ghost" ? "hover:bg-white/10" : "hover:opacity-90");

  return <button className={className} style={style}>{label}</button>;
}

function PhonePreview({ cfg }: { cfg: ThemeConfig }) {
  const bgStyle = useMemo<React.CSSProperties>(
    () => ({ background: cfg.background.value }),
    [cfg.background]
  );

  return (
    <div className="rounded-[40px] border border-white/10 bg-black/20 p-4 shadow-2xl w-[360px] mx-auto">
      <div className="rounded-3xl overflow-hidden" style={bgStyle}>
        <div className="p-6 text-center" style={{ color: cfg.palette.text }}>
          <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-3 border border-white/20" />
          <h2 className="text-xl font-extrabold">Seu Nome</h2>
          <p className="text-sm" style={{ color: cfg.palette.muted }}>
            Bio curtinha de exemplo para contraste.
          </p>
        </div>
        <div className="px-4 pb-6 space-y-3">
          {sampleLinks.map((l) => (
            <ButtonPreview key={l.id} label={l.label} cfg={cfg} />
          ))}
        </div>
        <div className="text-center text-xs pb-5" style={{ color: cfg.palette.muted }}>
          feito com ♥ sua marca
        </div>
      </div>
    </div>
  );
}

/* ---------- Página ---------- */
export default function EditorLinkBio() {
  const [cfg, setCfg] = useState<ThemeConfig>(INITIAL);

  const cssVars = useMemo(
    () =>
      `:root{\n  --bg: ${cfg.background.value};\n  --text: ${cfg.palette.text};\n  --muted: ${cfg.palette.muted};\n  --card: ${cfg.palette.card};\n  --accent: ${cfg.palette.accent};\n}`,
    [cfg]
  );
  const jsonTheme = useMemo(() => JSON.stringify(cfg, null, 2), [cfg]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copiado!");
    } catch {
      alert("Não foi possível copiar");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1020] text-white">
      <div className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">
        {/* Controles */}
        <div className="space-y-4">
          <h1 className="text-2xl font-extrabold">Editor do Link da Bio</h1>
          <p className="text-white/70 text-sm">
            Personalize o tipo de botão, cores e plano de fundo com preview em tempo real.
          </p>

          <Section title="Cores">
            <div className="space-y-3">
              <Swatch label="Texto" value={cfg.palette.text} onChange={(v) => setCfg((c) => ({ ...c, palette: { ...c.palette, text: v } }))} />
              <Swatch label="Suave (muted)" value={cfg.palette.muted} onChange={(v) => setCfg((c) => ({ ...c, palette: { ...c.palette, muted: v } }))} />
              <Swatch label="Cartão" value={cfg.palette.card} onChange={(v) => setCfg((c) => ({ ...c, palette: { ...c.palette, card: v } }))} />
              <Swatch label="Acento (botões)" value={cfg.palette.accent} onChange={(v) => setCfg((c) => ({ ...c, palette: { ...c.palette, accent: v } }))} />
            </div>
          </Section>

          <Section title="Fundo">
            <div className="space-y-3">
              <Radio
                label="Tipo"
                value={cfg.background.type}
                options={[
                  { value: "color", label: "Cor" },
                  { value: "gradient", label: "Gradiente" }
                ]}
                onChange={(v) => setCfg((c) => ({ ...c, background: { ...c.background, type: v } }))}
              />
              <div className="space-y-1">
                <label className="text-sm text-white/80">Valor</label>
                <input
                  className="w-full bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                  placeholder={cfg.background.type === "color" ? "#0b1020" : "linear-gradient(135deg, #22d3ee, #a78bfa)"}
                  value={cfg.background.value}
                  onChange={(e) => setCfg((c) => ({ ...c, background: { ...c.background, value: e.target.value } }))}
                />
                {cfg.background.type === "color" && (
                  <input
                    type="color"
                    className="h-10 w-12 rounded mt-2"
                    value={cfg.background.value}
                    onChange={(e) => setCfg((c) => ({ ...c, background: { ...c.background, value: e.target.value } }))}
                  />
                )}
              </div>
            </div>
          </Section>

          <Section title="Botões">
            <div className="space-y-4">
              <Radio
                label="Tipo"
                value={cfg.button.variant}
                options={[
                  { value: "solid", label: "Solid" },
                  { value: "outline", label: "Outline" },
                  { value: "ghost", label: "Ghost" }
                ]}
                onChange={(v) => setCfg((c) => ({ ...c, button: { ...c.button, variant: v } }))}
              />
              <Slider label="Raio (bordas)" min={0} max={28} value={cfg.button.radius} onChange={(n) => setCfg((c) => ({ ...c, button: { ...c.button, radius: n } }))} />
              <Radio
                label="Sombra"
                value={cfg.button.shadow}
                options={[
                  { value: "none", label: "Sem" },
                  { value: "soft", label: "Suave" },
                  { value: "lg", label: "Forte" }
                ]}
                onChange={(v) => setCfg((c) => ({ ...c, button: { ...c.button, shadow: v } }))}
              />
            </div>
          </Section>

          <Section title="Exportar tema">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">CSS Variables</span>
                <button className="px-3 py-1.5 rounded-xl border bg-white/5 hover:bg-white/10 text-sm" onClick={() => copy(cssVars)}>Copiar</button>
              </div>
              <pre className="bg-black/30 border border-white/10 rounded-xl p-3 text-xs whitespace-pre-wrap max-h-40 overflow-auto">{cssVars}</pre>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-white/80">JSON do Tema</span>
                <button className="px-3 py-1.5 rounded-xl border bg-white/5 hover:bg-white/10 text-sm" onClick={() => copy(jsonTheme)}>Copiar</button>
              </div>
              <pre className="bg-black/30 border border-white/10 rounded-xl p-3 text-xs whitespace-pre overflow-auto max-h-56">{jsonTheme}</pre>
            </div>
          </Section>
        </div>

        {/* Preview */}
        <div className="grid place-items-center">
          <PhonePreview cfg={cfg} />
        </div>
      </div>
    </div>
  );
}
