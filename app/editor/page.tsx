"use client";

import React, { useMemo, useState } from "react";

/** Tipos básicos */
type ThemeConfig = {
  background: { type: "color" | "gradient" | "image"; value: string };
  palette: { text: string; accent: string; muted: string; card: string };
  button: { variant: "solid" | "outline" | "ghost"; radius: number; shadow: "none" | "soft" | "lg" };
};
type LinkItem = { id: string; label: string; url: string };
type Category = { id: string; title: string; limit?: number; items: LinkItem[] };
type PageConfig = {
  slug: string;
  title: string;
  bio?: string;
  avatar?: { src?: string };
  theme: ThemeConfig;
  socials: { id: string; type: string; url: string }[];
  categories: Category[];
  topLinks: { id: string; label: string; url: string }[];
};

/** Defaults simples para começar */
const INITIAL: PageConfig = {
  slug: "seu-slug",
  title: "Seu Nome",
  bio: "Bio curtinha de exemplo para contraste.",
  avatar: { src: undefined },
  theme: {
    background: { type: "color", value: "#0b1020" },
    palette: { text: "#e5e7eb", accent: "#22d3ee", muted: "#94a3b8", card: "#111827" },
    button: { variant: "solid", radius: 18, shadow: "soft" },
  },
  socials: [],
  topLinks: [],
  categories: [
    {
      id: crypto.randomUUID(),
      title: "Destaques",
      limit: 6,
      items: [
        { id: crypto.randomUUID(), label: "Fale comigo no WhatsApp", url: "#" },
        { id: crypto.randomUUID(), label: "Agende um horário", url: "#" },
        { id: crypto.randomUUID(), label: "Me siga no Instagram", url: "#" },
      ],
    },
  ],
};

/** Helpers do Editor */
function Section({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <section className="bg-white/5 border border-white/10 rounded-2xl p-4">
      <h3 className="text-sm font-bold tracking-wide uppercase text-white/70 mb-3">{title}</h3>
      {children}
    </section>
  );
}

function Swatch({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
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

function Radio<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
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

function Slider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  unit = "px",
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  unit?: string;
  onChange: (n: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm text-white/80">
        <span>{label}</span>
        <span className="tabular-nums text-white/60">
          {value}
          {unit}
        </span>
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

/** Preview do botão com o tema */
function ButtonPreview({ label, cfg }: { label: string; cfg: ThemeConfig }) {
  const style: React.CSSProperties = useMemo(() => {
    return {
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
    } as React.CSSProperties;
  }, [cfg]);

  const cn =
    "w-full font-semibold px-4 py-3 border transition-transform active:translate-y-px " +
    (cfg.button.variant === "ghost" ? "hover:bg-white/10" : "hover:opacity-90");

  return (
    <button className={cn} style={style}>
      {label}
    </button>
  );
}

/** Preview do “celular” */
function PhonePreview({ page }: { page: PageConfig }) {
  const cfg = page.theme;
  const bgStyle = useMemo(() => ({ background: cfg.background.value }), [cfg.background.value]);

  return (
    <div className="rounded-[40px] border border-white/10 bg-black/20 p-4 shadow-2xl w-[360px] mx-auto">
      <div className="rounded-3xl overflow-hidden" style={bgStyle}>
        <div className="p-6 text-center" style={{ color: cfg.palette.text }}>
          <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-3 border border-white/20 overflow-hidden" />
          <h2 className="text-xl font-extrabold">{page.title}</h2>
          {page.bio && (
            <p className="text-sm" style={{ color: cfg.palette.muted }}>
              {page.bio}
            </p>
          )}
        </div>
        <div className="px-4 pb-6 space-y-3">
          {(page.categories[0]?.items ?? []).map((l) => (
            <ButtonPreview key={l.id} label={l.label} cfg={cfg} />
          ))}
        </div>
        <div className="text-center text-[10px] pb-5" style={{ color: cfg.palette.muted }}>
          {`seu.dominio.com/${page.slug}`}
        </div>
      </div>
    </div>
  );
}

/** Helpers para gerar o link público */
function encodePage(p: PageConfig) {
  const json = JSON.stringify(p);
  const b64 = btoa(String.fromCharCode(...new TextEncoder().encode(json)));
  return encodeURIComponent(b64);
}
function makeShareUrl(p: PageConfig) {
  const url = new URL("/v", window.location.origin);
  url.searchParams.set("d", encodePage(p));
  return url.toString();
}

export default function EditorPage() {
  const [page, setPage] = useState<PageConfig>(INITIAL);

  const updateTheme = (patch: Partial<ThemeConfig>) =>
    setPage((prev) => ({ ...prev, theme: { ...prev.theme, ...patch } }));

  const publish = () => {
    const url = makeShareUrl(page);
    navigator.clipboard.writeText(url).catch(() => {});
    window.open(url, "_blank");
    alert("Link público copiado!");
  };

  return (
    <div className="min-h-screen bg-[#0b1020] text-white">
      <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 xl:grid-cols-[520px_1fr] gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-2xl font-extrabold">Editor do Link da Bio</h1>
            <button
              onClick={publish}
              className="px-3 py-2 rounded-xl border bg-emerald-500/20 border-emerald-300/30 hover:bg-emerald-500/25 text-sm"
            >
              Gerar link público
            </button>
          </div>

          <Section title="Identidade & URL">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-white/80">Título</label>
                <input
                  className="w-full bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                  value={page.title}
                  onChange={(e) => setPage((p) => ({ ...p, title: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm text-white/80">Slug</label>
                <input
                  className="w-full bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                  value={page.slug}
                  onChange={(e) =>
                    setPage((p) => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))
                  }
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="text-sm text-white/80">Bio</label>
              <textarea
                rows={2}
                className="w-full bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                value={page.bio}
                onChange={(e) => setPage((p) => ({ ...p, bio: e.target.value }))}
              />
            </div>
          </Section>

          <Section title="Tema (cores, fundo, botões)">
            <div className="space-y-4">
              <div className="space-y-3">
                <Swatch
                  label="Texto"
                  value={page.theme.palette.text}
                  onChange={(v) => updateTheme({ palette: { ...page.theme.palette, text: v } })}
                />
                <Swatch
                  label="Suave (muted)"
                  value={page.theme.palette.muted}
                  onChange={(v) => updateTheme({ palette: { ...page.theme.palette, muted: v } })}
                />
                <Swatch
                  label="Cartão"
                  value={page.theme.palette.card}
                  onChange={(v) => updateTheme({ palette: { ...page.theme.palette, card: v } })}
                />
                <Swatch
                  label="Acento (botões)"
                  value={page.theme.palette.accent}
                  onChange={(v) => updateTheme({ palette: { ...page.theme.palette, accent: v } })}
                />
              </div>

              <div className="space-y-3">
                <Radio
                  label="Fundo: tipo"
                  value={page.theme.background.type}
                  options={[
                    { value: "color", label: "Cor" },
                    { value: "gradient", label: "Gradiente" },
                    { value: "image", label: "Imagem" },
                  ]}
                  onChange={(v) => updateTheme({ background: { ...page.theme.background, type: v } })}
                />
                <input
                  className="w-full bg-black/20 border border-white/15 rounded-xl px-3 py-2 text-sm"
                  placeholder={
                    page.theme.background.type === "color"
                      ? "#0b1020"
                      : page.theme.background.type === "gradient"
                      ? "linear-gradient(135deg, #22d3ee, #a78bfa)"
                      : "url(https://...) center/cover no-repeat"
                  }
                  value={page.theme.background.value}
                  onChange={(e) =>
                    updateTheme({ background: { ...page.theme.background, value: e.target.value } })
                  }
                />
              </div>

              <div className="space-y-4">
                <Radio
                  label="Botão: tipo"
                  value={page.theme.button.variant}
                  options={[
                    { value: "solid", label: "Solid" },
                    { value: "outline", label: "Outline" },
                    { value: "ghost", label: "Ghost" },
                  ]}
                  onChange={(v) => updateTheme({ button: { ...page.theme.button, variant: v } })}
                />
                <Slider
                  label="Raio (bordas)"
                  min={0}
                  max={28}
                  value={page.theme.button.radius}
                  onChange={(n) => updateTheme({ button: { ...page.theme.button, radius: n } })}
                />
                <Radio
                  label="Sombra"
                  value={page.theme.button.shadow}
                  options={[
                    { value: "none", label: "Sem" },
                    { value: "soft", label: "Suave" },
                    { value: "lg", label: "Forte" },
                  ]}
                  onChange={(v) => updateTheme({ button: { ...page.theme.button, shadow: v } })}
                />
              </div>
            </div>
          </Section>
        </div>

        {/* Preview */}
        <div className="grid place-items-center">
          <PhonePreview page={page} />
        </div>
      </div>
    </div>
  );
}
